import { Volume2, VolumeX } from 'lucide-react';

export default function MusicToggle({ playing, onToggle }) {
  return (
    <button
      type="button"
      className="music"
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? 'Mute music' : 'Play music'}
    >
      {playing ? <Volume2 size={18} strokeWidth={1.4} /> : <VolumeX size={18} strokeWidth={1.4} />}
    </button>
  );
}
