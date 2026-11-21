import { Navigation } from 'lucide-react';
import { wedding } from '../data/weddingConfig.js';
import useReveal from '../hooks/useReveal.js';
import { Divider } from './Ornaments.jsx';

export default function Venue() {
  const { title, nameKn, nameEn, address, mapsLink, mapQuery, mapEmbedUrl, directionsLabel, closing } = wedding.venue;
  const [ref, seen] = useReveal(0.15);
  const embed = mapEmbedUrl || `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

  return (
    <section className="page" id="venue">
      <div ref={ref} className={`page__inner reveal ${seen ? 'in' : ''}`}>
        <p className="kicker r" style={{ '--i': 0 }}>{title}</p>
        <h2 className="venue__kn r" style={{ '--i': 1 }} lang="kn">{nameKn}</h2>
        <p className="venue__en r" style={{ '--i': 2 }}>{nameEn}</p>
        {address && <p className="venue__address r" style={{ '--i': 3 }}>{address}</p>}

        <div className="mapArch r" style={{ '--i': 4 }}>
          <iframe
            title={`Map showing ${nameEn}`}
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <a className="btn btn--link r" style={{ '--i': 5 }} href={mapsLink} target="_blank" rel="noopener noreferrer">
          <Navigation size={16} strokeWidth={1.5} aria-hidden="true" />
          <span className="btn__label">{directionsLabel}</span>
        </a>

        <Divider className="divider divider--end r" style={{ '--i': 6 }} />
        <p className="closing r" style={{ '--i': 7 }}>{closing}</p>
        <p className="closing__names r" style={{ '--i': 8 }}>
          {wedding.bride} <em>&amp;</em> {wedding.groom}
        </p>
      </div>
    </section>
  );
}
