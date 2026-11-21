import { useEffect, useState } from 'react';
import { wedding } from '../data/weddingConfig.js';
import useReveal from '../hooks/useReveal.js';
import { MonogramRing } from './Ornaments.jsx';
import ScrollCue from './ScrollCue.jsx';

function useCountdown(iso) {
  const target = new Date(iso).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    done: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

export default function DateSection() {
  const { iso, day, weekday, monthYear, time, title } = wedding.date;
  const [ref, seen] = useReveal();
  const c = useCountdown(iso);
  const units = [['days', c.days], ['hours', c.hours], ['minutes', c.minutes], ['seconds', c.seconds]];

  return (
    <section className="page" id="date">
      <div ref={ref} className={`page__inner reveal ${seen ? 'in' : ''}`}>
        <p className="kicker r" style={{ '--i': 0 }}>{title}</p>

        <div className="dateRing r" style={{ '--i': 1 }} role="img" aria-label={`${weekday}, ${day} ${monthYear}`}>
          <MonogramRing />
          <div className="dateRing__text" aria-hidden="true">
            <span className="dateRing__weekday">{weekday}</span>
            <span className="dateRing__day">{day}</span>
            <span className="dateRing__month">{monthYear}</span>
          </div>
        </div>

        {time && <p className="time r" style={{ '--i': 2 }}>{time}</p>}

        {c.done ? (
          <p className="prose r" style={{ '--i': 3 }}>Today is the day.</p>
        ) : (
          <div className="countdown r" style={{ '--i': 3 }} role="timer" aria-label="Time until the wedding">
            {units.map(([label, value]) => (
              <div className="countdown__unit" key={label}>
                <span className="countdown__num">{String(value).padStart(2, '0')}</span>
                <span className="countdown__label">{label}</span>
              </div>
            ))}
          </div>
        )}

        <ScrollCue
          href="#venue"
          label={wedding.scrollLabels.venue}
          index={4}
        />
      </div>
    </section>
  );
}
