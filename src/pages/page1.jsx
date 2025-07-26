// src/pages/Page1.jsx
import { useState } from 'react';
import startImg from '../assets/buttons/start2.png';
import stopImg from '../assets/buttons/login.png';
import board from '../assets/images/board-rm.png';
import clickSound from '../assets/sounds/click_sound.mp3';
import GameLayout from '../components/GameLayout';

const Page1 = () => {
  const [pressedButton, setPressedButton] = useState(null);

  const playClickSound = () => {
    const sound = new Audio(clickSound);
    sound.volume = 0.7;
    sound.play();
  };

  const baseButtonStyle = (img, isPressed) => ({
    backgroundImage: `url(${img})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '145px',
    height: '48px',
    border: 'none',
    marginBottom: '0.8rem',
    cursor: 'pointer',
    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
    boxShadow: isPressed
      ? 'inset 0px 2px 4px rgba(0, 0, 0, 0.5)'
      : '2px 4px 0px rgba(0, 0, 0, 0.5)',
    transition: 'all 0.1s ease-in-out',
    imageRendering: 'pixelated',
    borderRadius: '18px',
  });

  return (
    <GameLayout>
      <div
        className="flex flex-col justify-center items-center p-8"
        style={{
          backgroundImage: `url(${board})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: 600,
          height: 400,
          animation: 'floatPixel 0.6s ease-in-out infinite',
          imageRendering: 'pixelated',
        }}
      >
        <button
          style={baseButtonStyle(startImg, pressedButton === 'start')}
          onMouseDown={() => {
            setPressedButton('start');
            playClickSound();
          }}
          onMouseUp={() => setPressedButton(null)}
          onMouseLeave={() => setPressedButton(null)}
        />
        <button
          style={baseButtonStyle(stopImg, pressedButton === 'stop')}
          onMouseDown={() => {
            setPressedButton('stop');
            playClickSound();
          }}
          onMouseUp={() => setPressedButton(null)}
          onMouseLeave={() => setPressedButton(null)}
        />
      </div>

      <style>
        {`
          @keyframes floatPixel {
            0% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </GameLayout>
  );
};

export default Page1;
