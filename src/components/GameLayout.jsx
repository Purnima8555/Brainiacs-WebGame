import { useEffect, useRef, useState } from 'react';
import musicOnImg from '../assets/buttons/music.png';
import musicOffImg from '../assets/buttons/music_off.png';
import bg from '../assets/images/bg.jpeg';
import logo from '../assets/images/logo_home.png';
import bgMusic from '../assets/sounds/bg_music.mp3';
import clickSound from '../assets/sounds/click_sound.mp3';

const GameLayout = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMusicPressed, setIsMusicPressed] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    const music = new Audio(bgMusic);
    music.loop = true;
    music.volume = 0.3;
    music
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.warn('Autoplay blocked:', err));
    musicRef.current = music;

    return () => {
      music.pause();
    };
  }, []);

  const toggleMusic = () => {
    playClickSound();
    if (!musicRef.current) return;
    if (isPlaying) {
      musicRef.current.pause();
      setIsPlaying(false);
    } else {
      musicRef.current.play();
      setIsPlaying(true);
    }
  };

  const playClickSound = () => {
    const sound = new Audio(clickSound);
    sound.volume = 0.7;
    sound.play();
  };

  const musicButtonStyle = (img, isPressed) => ({
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '48px',
    height: '50px',
    border: 'none',
    cursor: 'pointer',
    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
    boxShadow: isPressed
      ? 'inset 0px 2px 4px rgba(0, 0, 0, 0.5)'
      : '2px 4px 0px rgba(0, 0, 0, 0.5)',
    transition: 'all 0.1s ease-in-out',
    imageRendering: 'pixelated',
    borderRadius: '5px',
  });

  return (
    <div
      className="relative min-h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 🎧 Music Button */}
      <button
        onClick={toggleMusic}
        onMouseDown={() => setIsMusicPressed(true)}
        onMouseUp={() => setIsMusicPressed(false)}
        onMouseLeave={() => setIsMusicPressed(false)}
        className="absolute top-5 right-7 z-10"
        style={musicButtonStyle(
          isPlaying ? musicOnImg : musicOffImg,
          isMusicPressed
        )}
      />

      {/* 🧠 Logo */}
      <img
        src={logo}
        alt="Brainiacs Logo"
        className="absolute top-7 left-7 w-60 z-10"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* 📄 Page Content */}
      <div className="z-0">{children}</div>
    </div>
  );
};

export default GameLayout;
