// Decorative SVG building blocks. All use `currentColor`, so colour is set in CSS.

const petals = (count, radius, rx, ry) =>
  Array.from({ length: count }, (_, i) => (
    <ellipse
      key={`${count}-${radius}-${i}`}
      cx="0"
      cy={-radius}
      rx={rx}
      ry={ry}
      transform={`rotate(${(i * 360) / count})`}
    />
  ));

/** Rangoli-style mandala, used as the large faint backdrop. */
export function Mandala({ className = '' }) {
  return (
    <svg className={className} viewBox="-100 -100 200 200" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="0.45">
      <circle r="97" />
      <circle r="93" strokeDasharray="0.1 3" strokeLinecap="round" strokeWidth="1.2" />
      {petals(24, 84, 3.2, 9)}
      {petals(16, 66, 6, 17)}
      {petals(16, 52, 3.5, 11)}
      {petals(12, 36, 7, 18)}
      <circle r="24" />
      {petals(8, 15, 4, 9)}
      <circle r="4" />
    </svg>
  );
}

/** Ring artwork behind the monogram initials. */
export function MonogramRing() {
  return (
    <svg className="monogram__ring" viewBox="-100 -100 200 200" aria-hidden="true" fill="none" stroke="currentColor">
      <circle r="97" strokeWidth="1.4" />
      <circle r="91.5" strokeWidth="0.5" />
      <circle r="85" strokeWidth="1.8" strokeDasharray="0.1 5.6" strokeLinecap="round" />
      <g className="monogram__petals" strokeWidth="0.6">
        {petals(24, 74, 3.4, 7.5)}
      </g>
      <circle r="62" strokeWidth="0.6" />
    </svg>
  );
}

/** Corner flourish. Mirror it with CSS transforms for the other three corners. */
export function Corner({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 116V32Q6 6 32 6H116" />
      <path d="M14 116V36Q14 14 36 14H116" opacity="0.45" />
      <g transform="translate(34 34)">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cy="-10" rx="3.2" ry="7.5" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="3" fill="currentColor" stroke="none" />
      </g>
      <circle cx="6" cy="116" r="2" fill="currentColor" stroke="none" />
      <circle cx="116" cy="6" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Line – lotus – line divider. */
export function Divider({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 240 26" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="0.9">
      <defs>
        <linearGradient id="dividerFadeL" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
        <linearGradient id="dividerFadeR" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="4" y1="13" x2="98" y2="13" stroke="url(#dividerFadeL)" />
      <line x1="142" y1="13" x2="236" y2="13" stroke="url(#dividerFadeR)" />
      <path d="M120 3C127 9 127 17 120 23C113 17 113 9 120 3Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M120 23C107 21 102 14 103 8C111 10 117 15 120 23Z" />
      <path d="M120 23C133 21 138 14 137 8C129 10 123 15 120 23Z" />
      <circle cx="94" cy="13" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="146" cy="13" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
