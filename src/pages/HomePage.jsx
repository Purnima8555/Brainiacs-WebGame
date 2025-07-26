import { Trophy, Zap, Heart, Star } from 'lucide-react';
import { useState } from 'react';
import addImage from '../assets/buttons/add.png';
import divideImage from '../assets/buttons/divide.png';
import multiplyImage from '../assets/buttons/multiply.png';
import subtractImage from '../assets/buttons/subtract.png';
import banner from '../assets/images/banner1.png';
import frameBg from '../assets/images/frame2.png';
import frameBgProgress from '../assets/images/frame3.png';
import frameBgStreak from '../assets/images/frame4.png';
import heartImage from '../assets/images/heart.png';
import blockSound from '../assets/sounds/block_sound.mp3';
import GameLayout from '../components/GameLayout';

const HomePage = () => {
  const [currentStreak, setCurrentStreak] = useState(3);
  const [completedLevels, setCompletedLevels] = useState(5);
  const [totalLevels] = useState(10);
  const [userName] = useState("Alex");
  const [showCelebration, setShowCelebration] = useState(false);
  const [pressedCategory, setPressedCategory] = useState(null);

  const playSound = () => {
    const audio = new Audio(blockSound);
    audio.play().catch((error) => console.error("Error playing sound:", error));
  };

  const handleCategoryClick = (index) => {
    playSound();
    setPressedCategory(index);
    setTimeout(() => setPressedCategory(null), 100);
  };

  const mathCategories = [
    { name: "Addition", image: addImage },
    { name: "Subtraction", image: subtractImage },
    { name: "Multiplication", image: multiplyImage },
    { name: "Division", image: divideImage },
  ];

  const progressPercentage = (completedLevels / totalLevels) * 100;

  const handleStartGame = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  return (
    <GameLayout>
      <div className="relative z-10 min-h-screen p-6">
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="text-6xl animate-bounce">🎉 Let's Go! 🎉</div>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          {/* ✅ Banner Section */}
          <div className="relative w-3/5 mx-auto mb-6 transform hover:scale-105 transition-transform duration-300">
            <img
              src={banner}
              alt="Banner"
              className="w-full h-auto object-contain rounded-3xl"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-2xl font-pixel font-semibold text-black drop-shadow-lg mb-2">
                Hey {userName}, ready for today's challenge? 🚀
              </h1>
              <p className="text-lg font-pixel text-black drop-shadow">
                Let's make math fun and exciting!
              </p>
            </div>
          </div>

          {/* ✅ Main Layout Split: Categories left, Progress & Total Hearts right */}
          <div className="flex flex-col md:flex-row gap-8 mb-6">
            {/* 📚 Categories Left Side */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Choose Your Adventure! 🎮
              </h2>
              <div className="grid grid-cols-2 gap-x-2 gap-y-4 justify-items-center">
                {mathCategories.map((category, index) => {
                  return (
                    <div
                      key={index}
                      className="relative text-center cursor-pointer transform hover:scale-105 transition-all duration-100 text-gray-800"
                      style={{
                        backgroundImage: `url(${frameBg})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '230px',
                        height: '230px',
                        border: '2px solid black',
                        cursor: 'pointer',
                        transform: pressedCategory === index ? 'scale(0.95)' : 'scale(1)',
                        boxShadow: pressedCategory === index
                          ? 'inset 0px 4px 8px rgba(0, 0, 0, 0.5)'
                          : '4px 8px 0px rgba(0, 0, 0, 0.5)',
                        transition: 'all 0.1s ease-in-out',
                        imageRendering: 'pixelated',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                      }}
                      onClick={() => handleCategoryClick(index)}
                    >
                      <div
                        className="rounded-full w-16 h-16 flex items-center justify-center mb-2"
                        style={{
                          backgroundColor: 'transparent',
                          border: '2px solid black',
                          boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <img
                          src={category.image}
                          alt={`${category.name} icon`}
                          className="w-16 h-16 object-cover"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      <h3 className="font-pixel font-bold mb-2 text-xl text-[#fee3ba]">{category.name}</h3>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 📊 Right Side: Progress & Total Hearts */}
            <div className="flex flex-col gap-6 w-full max-w-md">
              {/* Progress */}
              <div
                className="rounded-xl shadow-2xl p-6 transform hover:scale-105 transition duration-300"
                style={{
                  backgroundImage: `url(${frameBgProgress})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  width: '400px',
                  backgroundPosition: 'center',
                  imageRendering: 'pixelated',
                }}
              >
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <Trophy className="text-orange-500 mr-3" size={32} />
                    <h2 className="text-2xl font-bold text-gray-800">Your Progress</h2>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
                      <span>Levels Completed</span>
                      <span>{completedLevels}/{totalLevels}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-gray-600">Keep going! You're doing amazing! 🌟</p>
                </div>
              </div>

              {/* Total Hearts & Total Exp Gained */}
              <div className="flex flex-row gap-6">
                {/* Total Hearts */}
                <div
                  className="rounded-3xl p-6"
                  style={{
                    backgroundImage: `url(${frameBgStreak})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    imageRendering: 'pixelated',
                    width: '230px',
                    height: '230px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="p-2">
                    <div className="flex items-center mb-4">
                      <Zap className="text-orange-500 mr-3" size={24} />
                      <h2 className="text-xl font-pixel font-bold text-gray-800">Total Hearts</h2>
                    </div>
                    <div className="flex justify-center items-center text-3xl font-bold text-black mb-2">
                      <span>5</span>
                      <img
                        src={heartImage}
                        alt="Heart icon"
                        className="w-9 h-9 object-contain ml-2"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Total Exp Gained */}
                <div
                  className="rounded-3xl p-6"
                  style={{
                    backgroundImage: `url(${frameBgStreak})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    imageRendering: 'pixelated',
                    width: '230px',
                    height: '230px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="p-2">
                    <div className="flex items-center mb-4">
                      <Zap className="text-orange-500 mr-3" size={24} />
                      <h2 className="text-xl font-pixel font-bold text-gray-800">Total Exp Gained</h2>
                    </div>
                    <div className="flex justify-center items-center text-3xl font-bold text-black mb-2">
                      <span>27</span>
                      <Star className="ml-2 text-orange-500" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 🎮 Start Button */}
              <div className="text-center mb-6">
                <button
                  onClick={handleStartGame}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 animate-pulse"
                >
                  🎮 Start Today's Challenge!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default HomePage;