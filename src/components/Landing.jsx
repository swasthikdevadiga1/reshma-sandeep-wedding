import { ChevronDown, Heart } from 'lucide-react';
import { wedding } from '../data/weddingConfig.js';
import { Corner, Divider, Mandala } from './Ornaments.jsx';
import Monogram from './Monogram.jsx';

export default function Landing({ opened, onOpen }) {
  const { groom, bride, monogram } = wedding;

  return (
    <main className="stage" data-open={opened} id="top">
      <div className="bloom" aria-hidden="true" />
      <Mandala className="bg-mandala" />
      <Corner className="corner corner--tl" />
      <Corner className="corner corner--tr" />
      <Corner className="corner corner--bl" />
      <Corner className="corner corner--br" />

      <section className="content">
        <p className="intro rise" style={{ '--i': 0 }}>{wedding.intro}</p>

        <div className="rise" style={{ '--i': 1 }}>
          <Monogram left={monogram.left} right={monogram.right} />
        </div>

        <h1 className="names rise" style={{ '--i': 2 }}>
          <span>{bride}</span>
          <em className="names__amp" aria-label="and">&amp;</em>
          <span>{groom}</span>
        </h1>

        <p className="subtitle rise" style={{ '--i': 3 }}>{wedding.subtitle}</p>
        <Divider className="divider rise" style={{ '--i': 4 }} />

        <div className="swap">
          <div className="swap__pre">
            <p className="tagline rise" style={{ '--i': 5 }}>{wedding.tagline}</p>
            <button
              type="button"
              className="btn rise"
              style={{ '--i': 6 }}
              onClick={onOpen}
              tabIndex={opened ? -1 : 0}
            >
              <span className="btn__label">{wedding.buttonLabel}</span>
            </button>
            <p className="hint rise" style={{ '--i': 7 }}>{wedding.hint}</p>
          </div>

          <div className="swap__post" aria-live="polite">
            {opened && (
              <>
                <Heart className="swap__heart" size={18} strokeWidth={1.4} aria-hidden="true" />
                <p className="message">{wedding.message}</p>
                <a className="cue" href="#welcome" aria-label="Explore the date and venue details">
                  <span className="cue__label">{wedding.cueLabel}</span>
                  <span className="cue__icon" aria-hidden="true">
                    <ChevronDown size={18} strokeWidth={1.5} />
                  </span>
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
