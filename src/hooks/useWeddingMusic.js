import { useCallback, useEffect, useRef, useState } from 'react';

/* Warm instrumental, synthesised live with the Web Audio API (no audio files):
   a soft tanpura-style drone, a gentle pad, and slow plucked phrases in the
   Bhoopali scale (S R G P D) with plenty of reverb. */

const SA = 130.81; // C3
const SCALE = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
const hz = (semi) => SA * 2 ** (semi / 12);

function impulse(ctx, seconds = 3.8, decay = 2.6) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** decay;
  }
  return buf;
}

function buildSynth() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();

  const master = ctx.createGain();
  master.gain.value = 0;
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp);
  comp.connect(ctx.destination);

  const reverb = ctx.createConvolver();
  reverb.buffer = impulse(ctx);
  const wet = ctx.createGain();
  wet.gain.value = 0.6;
  reverb.connect(wet);
  wet.connect(master);

  const bus = ctx.createGain();
  const dry = ctx.createGain();
  dry.gain.value = 0.8;
  bus.connect(dry);
  dry.connect(master);
  bus.connect(reverb);

  const sources = [];

  // Drone: Sa (low), Pa, Sa
  const droneFilter = ctx.createBiquadFilter();
  droneFilter.type = 'lowpass';
  droneFilter.frequency.value = 650;
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.07;
  droneFilter.connect(droneGain);
  droneGain.connect(bus);
  [[SA / 2, -4], [SA / 2, 4], [SA * 0.75, -3], [SA * 0.75, 3], [SA, 0]].forEach(([f, d]) => {
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = f;
    o.detune.value = d;
    o.connect(droneFilter);
    o.start();
    sources.push(o);
  });
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.07;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 200;
  lfo.connect(lfoDepth);
  lfoDepth.connect(droneFilter.frequency);
  lfo.start();
  sources.push(lfo);

  // Pad: open major voicing
  const padGain = ctx.createGain();
  padGain.gain.value = 0.03;
  padGain.connect(bus);
  [SA * 2, SA * 2.5, SA * 3, SA * 4].forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f;
    o.detune.value = (i - 1.5) * 4;
    o.connect(padGain);
    o.start();
    sources.push(o);
  });

  // Echo for the plucks
  const echo = ctx.createDelay(1.5);
  echo.delayTime.value = 0.64;
  const fb = ctx.createGain();
  fb.gain.value = 0.34;
  echo.connect(fb);
  fb.connect(echo);
  echo.connect(reverb);

  const pluck = (freq, when, vel) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(vel, when + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 3.4);
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 2400;
    f.connect(g);
    g.connect(bus);
    g.connect(echo);
    [['triangle', 1, 1], ['sine', 2, 0.25]].forEach(([type, mult, amp]) => {
      const o = ctx.createOscillator();
      const og = ctx.createGain();
      o.type = type;
      o.frequency.value = freq * mult;
      og.gain.value = amp;
      o.connect(og);
      og.connect(f);
      o.start(when);
      o.stop(when + 3.6);
    });
  };

  let idx = 5;
  let timer;
  let stopped = false;
  const phrase = () => {
    if (stopped) return;
    const notes = 2 + Math.floor(Math.random() * 3);
    let t = ctx.currentTime + 0.05;
    for (let i = 0; i < notes; i++) {
      const dir = Math.random() < 0.5 ? -1 : 1;
      idx = Math.min(SCALE.length - 1, Math.max(2, idx + dir * (Math.random() < 0.7 ? 1 : 2)));
      pluck(hz(SCALE[idx]), t, 0.17);
      t += 0.6 + Math.random() * 0.55;
    }
    timer = setTimeout(phrase, (t - ctx.currentTime) * 1000 + 1800 + Math.random() * 2600);
  };
  phrase();

  return {
    ctx,
    master,
    close() {
      stopped = true;
      clearTimeout(timer);
      sources.forEach((s) => { try { s.stop(); } catch { /* already stopped */ } });
      ctx.close();
    },
  };
}

export default function useWeddingMusic({ src = '', volume = 0.5 } = {}) {
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const synth = useRef(null);
  const audio = useRef(null);
  const fadeTimer = useRef(null);

  const fadeTo = useCallback((target, seconds) => {
    if (audio.current) {
      clearInterval(fadeTimer.current);
      const el = audio.current;
      const step = (target - el.volume) / ((seconds * 1000) / 60);
      fadeTimer.current = setInterval(() => {
        const next = el.volume + step;
        const done = step >= 0 ? next >= target : next <= target;
        el.volume = Math.min(1, Math.max(0, done ? target : next));
        if (done) {
          clearInterval(fadeTimer.current);
          if (target === 0) el.pause();
        }
      }, 60);
    } else if (synth.current) {
      const { ctx, master } = synth.current;
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(target, t + seconds);
    }
  }, []);

  const setOn = (on) => {
    playingRef.current = on;
    setPlaying(on);
  };

  const start = useCallback(() => {
    if (playingRef.current) return;
    if (src) {
      if (!audio.current) {
        audio.current = new Audio(src);
        audio.current.loop = true;
        audio.current.volume = 0;
      }
      audio.current.play().then(() => { fadeTo(volume, 4); setOn(true); }).catch(() => setOn(false));
      return;
    }
    if (!synth.current) synth.current = buildSynth();
    if (!synth.current) return;
    synth.current.ctx.resume().then(() => { fadeTo(volume, 4); setOn(true); });
  }, [src, volume, fadeTo]);

  const toggle = useCallback(() => {
    if (playingRef.current) {
      fadeTo(0, 0.8);
      setOn(false);
    } else {
      if (audio.current) audio.current.play();
      synth.current?.ctx.resume();
      fadeTo(volume, 1.5);
      setOn(true);
    }
  }, [volume, fadeTo]);

  // Be polite: hush the music while the tab is in the background.
  useEffect(() => {
    const onVis = () => {
      if (!playingRef.current) return;
      if (document.hidden) fadeTo(0, 0.4);
      else {
        if (audio.current) audio.current.play();
        fadeTo(volume, 1.5);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [volume, fadeTo]);

  useEffect(() => () => {
    clearInterval(fadeTimer.current);
    audio.current?.pause();
    synth.current?.close();
  }, []);

  return { playing, start, toggle };
}
