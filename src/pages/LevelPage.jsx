import React, { useState, useEffect, useRef } from 'react';
import { Clock, Star, Trophy, RotateCcw, Zap } from 'lucide-react';

const LevelPage = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'correct', 'wrong', 'levelComplete', 'timeUp'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [mascotMessage, setMascotMessage] = useState("Let's solve some math problems! 🎯");
  const [showFeedback, setShowFeedback] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);
  const timerRef = useRef(null);

  // Sample questions for Level 1: Addition Beginner
  const questions = [
    {
      question: "What's 5 + 3?",
      options: [6, 7, 8, 9],
      correct: 2,
      explanation: "5 + 3 = 8! Great job! 🎉"
    },
    {
      question: "What's 12 + 7?",
      options: [18, 19, 20, 21],
      correct: 1,
      explanation: "12 + 7 = 19! You're on fire! 🔥"
    },
    {
      question: "What's 9 + 6?",
      options: [14, 15, 16, 17],
      correct: 1,
      explanation: "9 + 6 = 15! Amazing! ⭐"
    },
    {
      question: "What's 8 + 4?",
      options: [11, 12, 13, 14],
      correct: 1,
      explanation: "8 + 4 = 12! You're a math star! 🌟"
    },
    {
      question: "What's 15 + 9?",
      options: [23, 24, 25, 26],
      correct: 1,
      explanation: "15 + 9 = 24! Incredible! 🎯"
    }
  ];

  const totalQuestions = questions.length;

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('timeUp');
      setMascotMessage("Time's up! Don't worry, let's try again! 💪");
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, gameState]);

  // Calculate level progress
  useEffect(() => {
    setLevelProgress((currentQuestion / totalQuestions) * 100);
  }, [currentQuestion, totalQuestions]);

  const handleQuizAnswer = (selectedIndex) => {
    if (gameState !== 'playing') return;

    setSelectedAnswer(selectedIndex);
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 100);
      setStreakCount(streakCount + 1);
      setGameState('correct');
      setMascotMessage(questions[currentQuestion].explanation);
      setShowFeedback(true);
      
      // Play success sound effect (simulated)
      console.log("🔊 Success sound: Ding!");
      
      setTimeout(() => {
        if (currentQuestion + 1 >= totalQuestions) {
          setGameState('levelComplete');
          setMascotMessage("Level Complete! You're amazing! 🏆");
        } else {
          setCurrentQuestion(currentQuestion + 1);
          setGameState('playing');
          setSelectedAnswer(null);
          setShowFeedback(false);
          setTimeLeft(30);
          setMascotMessage("Next question coming up! 🚀");
        }
      }, 2000);
    } else {
      setStreakCount(0);
      setGameState('wrong');
      setMascotMessage("Not quite right! Try again - you can do it! 💪");
      setShowFeedback(true);
      
      // Play error sound effect (simulated)
      console.log("🔊 Error sound: Boing!");
      
      setTimeout(() => {
        setGameState('playing');
        setSelectedAnswer(null);
        setShowFeedback(false);
      }, 2000);
    }
  };

  const resetLevel = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setGameState('playing');
    setSelectedAnswer(null);
    setMascotMessage("Let's solve some math problems! 🎯");
    setShowFeedback(false);
    setStreakCount(0);
  };

  const nextLevel = () => {
    setCurrentLevel(currentLevel + 1);
    resetLevel();
    setMascotMessage("Welcome to the next level! Ready for harder challenges? 🎮");
  };

  const getMascotEmotion = () => {
    switch (gameState) {
      case 'correct': return '🎉';
      case 'wrong': return '😅';
      case 'levelComplete': return '🏆';
      case 'timeUp': return '⏰';
      default: return '😊';
    }
  };

  if (gameState === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6 animate-bounce">🏆</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Level Complete!</h1>
          <div className="bg-yellow-100 rounded-2xl p-6 mb-6">
            <div className="text-2xl font-bold text-yellow-800 mb-2">Final Score: {score}</div>
            <div className="text-yellow-700">Questions Correct: {totalQuestions}/{totalQuestions}</div>
            <div className="text-yellow-700">Max Streak: {streakCount}</div>
          </div>
          <div className="space-y-4">
            <button
              onClick={nextLevel}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Next Level 🚀
            </button>
            <button
              onClick={resetLevel}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Play Again 🔄
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'timeUp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-orange-500 to-yellow-600 p-6 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6 animate-pulse">⏰</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Time's Up!</h1>
          <div className="bg-orange-100 rounded-2xl p-6 mb-6">
            <div className="text-2xl font-bold text-orange-800 mb-2">Score: {score}</div>
            <div className="text-orange-700">Questions Answered: {currentQuestion}/{totalQuestions}</div>
          </div>
          <div className="space-y-4">
            <button
              onClick={resetLevel}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Try Again 🔄
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Trophy className="text-yellow-500 mr-3" size={28} />
              <h1 className="text-2xl font-bold text-gray-800">
                Level {currentLevel}: Addition Beginner
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-blue-100 px-4 py-2 rounded-full">
                <Star className="text-blue-500 mr-2" size={20} />
                <span className="font-bold text-blue-800">{score}</span>
              </div>
              <div className="flex items-center bg-red-100 px-4 py-2 rounded-full">
                <Clock className="text-red-500 mr-2" size={20} />
                <span className="font-bold text-red-800">{timeLeft}s</span>
              </div>
              <button
                onClick={resetLevel}
                className="flex items-center bg-purple-100 px-4 py-2 rounded-full font-bold text-purple-800 hover:bg-purple-200 transition-all duration-300"
              >
                <RotateCcw className="mr-2" size={20} />
                Reset
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Quick Quiz Time! 🧠</h2>
              <div className="bg-purple-50 rounded-2xl p-8 mb-6">
                <div className="text-2xl font-bold text-purple-800 mb-6">{questions[currentQuestion].question}</div>
                <div className="grid grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`p-4 rounded-xl text-xl font-bold transition-all duration-300 ${
                        selectedAnswer === index && index === questions[currentQuestion].correct
                          ? 'bg-green-100 border-2 border-green-400 text-green-800'
                          : selectedAnswer === index
                          ? 'bg-red-100 border-2 border-red-400 text-red-800'
                          : 'bg-white border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transform hover:scale-105'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {showFeedback && (
                <div className={`border rounded-2xl p-4 mb-6 ${
                  gameState === 'correct' 
                    ? 'bg-green-100 border-green-400' 
                    : 'bg-red-100 border-red-400'
                }`}>
                  <p className={`font-bold text-lg ${
                    gameState === 'correct' 
                      ? 'text-green-800' 
                      : 'text-red-800'
                  }`}>
                    {mascotMessage}
                  </p>
                </div>
              )}

              {streakCount > 0 && (
                <div className="inline-flex items-center bg-orange-100 px-4 py-2 rounded-full mt-4">
                  <Zap className="text-orange-500 mr-2" size={16} />
                  <span className="text-orange-800 font-bold">
                    {streakCount} in a row!
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Mascot & Stats */}
          <div className="space-y-6">
            {/* Mascot */}
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <div className="text-center">
                <div className="text-8xl mb-4 animate-bounce">
                  {getMascotEmotion()}
                </div>
                <div className="bg-blue-100 rounded-2xl p-4">
                  <p className="text-blue-800 font-semibold">
                    {mascotMessage}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Score:</span>
                  <span className="font-bold text-blue-600">{score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Streak:</span>
                  <span className="font-bold text-orange-600">{streakCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-bold text-green-600">{Math.round(levelProgress)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelPage;