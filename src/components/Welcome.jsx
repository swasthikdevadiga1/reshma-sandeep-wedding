import { wedding } from '../data/weddingConfig.js';
import useReveal from '../hooks/useReveal.js';
import { Divider } from './Ornaments.jsx';
import ScrollCue from './ScrollCue.jsx';

export default function Welcome() {
  const { greeting, title, paragraphs, signoff } = wedding.welcome;
  const [ref, seen] = useReveal();

  return (
    <section className="page" id="welcome">
      <div ref={ref} className={`page__inner reveal ${seen ? 'in' : ''}`}>
        <p className="kn r" style={{ '--i': 0 }} lang="kn">{greeting}</p>
        <h2 className="page__title r" style={{ '--i': 1 }}>{title}</h2>
        <Divider className="divider r" style={{ '--i': 2 }} />
        {paragraphs.map((text, i) => (
          <p key={i} className="prose r" style={{ '--i': 3 + i }}>{text}</p>
        ))}
        <p className="signoff r" style={{ '--i': 3 + paragraphs.length }}>{signoff}</p>
        <ScrollCue
          href="#date"
          label={wedding.scrollLabels.date}
          index={4 + paragraphs.length}
        />
      </div>
    </section>
  );
}
