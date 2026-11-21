import { MonogramRing } from './Ornaments.jsx';

export default function Monogram({ left, right }) {
  return (
    <div className="monogram" role="img" aria-label={`${left} and ${right}`}>
      <MonogramRing />
      <span className="monogram__letters" aria-hidden="true">
        {left}
        <i>&amp;</i>
        {right}
      </span>
    </div>
  );
}
