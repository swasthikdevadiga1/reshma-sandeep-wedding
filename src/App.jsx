import { useEffect, useState } from 'react';
import { wedding } from './data/weddingConfig.js';
import useWeddingMusic from './hooks/useWeddingMusic.js';
import Landing from './components/Landing.jsx';
import Welcome from './components/Welcome.jsx';
import DateSection from './components/DateSection.jsx';
import Venue from './components/Venue.jsx';
import MusicToggle from './components/MusicToggle.jsx';

export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useWeddingMusic(wedding.music);

  // The cover is the only screen until the invitation is opened.
  useEffect(() => {
    document.documentElement.style.overflow = opened ? '' : 'hidden';
    if (!opened) window.scrollTo(0, 0);
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    music.start(); // runs inside the click, so browsers allow audio
  };

  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Landing opened={opened} onOpen={handleOpen} />
      {opened && (
        <>
          <Welcome />
          <DateSection />
          <Venue />
          <MusicToggle playing={music.playing} onToggle={music.toggle} />
        </>
      )}
    </>
  );
}
