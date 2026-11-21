import { ChevronDown } from 'lucide-react';

export default function ScrollCue({ href, label, index = 0 }) {
  return (
    <a
      className="scroll-cue r"
      style={{ '--i': index }}
      href={href}
      aria-label={label}
    >
      <span>{label}</span>
      <ChevronDown size={17} strokeWidth={1.6} aria-hidden="true" />
    </a>
  );
}
