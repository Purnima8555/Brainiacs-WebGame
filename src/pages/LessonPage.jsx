import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star, Trophy, PlayCircle, CheckCircle, Book, Target } from 'lucide-react';

const LessonPage = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [lessonStep, setLessonStep] = useState('intro'); // 'intro', 'visual', 'interactive', 'quiz', 'complete'
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZones, setDropZones] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [lessonProgress, setLessonProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  const lessons = [
    {
      id: 1,
      title: "Learn Addition",
      subtitle: "Adding numbers together",
      icon: "➕",
      visual: {
        problem: "3 + 2 = ?",
        items: ["🍎", "🍎", "🍎", "🍊", "🍊"],
        explanation: "When we add 3 apples and 2 oranges, we get 5 fruits total!"
      },
      interactive: {
        instruction: "Drag the fruits to the basket to solve 4 + 3!",
        leftSide: ["🍎", "🍎", "🍎", "🍎"],
        rightSide: ["🍊", "🍊", "🍊"],
        answer: 7
      },
      quiz: {
        question: "What is 5 + 4?",
        options: [8, 9, 10, 11],
        correct: 1,
        explanation: "5 + 4 = 9! You're doing great!"
      }
    },
    {
      id: 2,
      title: "Learn Subtraction",
      subtitle: "Taking numbers away",
      icon: "➖",
      visual: {
        problem: "5 - 2 = ?",
        items: ["🐶", "🐶", "🐶", "🐶", "🐶"],
        explanation: "If we start with 5 dogs and 2 run away, we have 3 dogs left!"
      },
      interactive: {
        instruction: "Click on 3 cats to take them away from the group of 6!",
        items: ["🐱", "🐱", "🐱", "🐱", "🐱", "🐱"],
        toRemove: 3,
        answer: 3
      },
      quiz: {
        question: "What is 8 - 3?",
        options: [4, 5, 6, 7],
        correct: 1,
        explanation: "8 - 3 = 5! You're a math superstar!"
      }
    },
    {
      id: 3,
      title: "Learn Multiplication",
      subtitle: "Groups of numbers",
      icon: "✖",
      visual: {
        problem: "2 × 3 = ?",
        items: [["🌟", "🌟", "🌟"], ["🌟", "🌟", "🌟"]],
        explanation: "2 groups of 3 stars each makes 6 stars total!"
      },
      interactive: {
        instruction: "Count the total flowers in these 3 groups of 4!",
        groups: [
          ["🌸", "🌸", "🌸", "🌸"],
          ["🌸", "🌸", "🌸", "🌸"],
          ["🌸", "🌸", "🌸", "🌸"]
        ],
        answer: 12
      },
      quiz: {
        question: "What is 4 × 3?",
        options: [10, 11, 12, 13],
        correct: 2,
        explanation: "4 × 3 = 12! Amazing work!"
      }
    }
  ];

  const currentLessonData = lessons[currentLesson];

  const getStepProgress = () => {
    const steps = ['intro', 'visual', 'interactive', 'quiz', 'complete'];
    return ((steps.indexOf(lessonStep) + 1) / steps.length) * 100;
  };

  const nextStep = () => {
    const steps = ['intro', 'visual', 'interactive', 'quiz', 'complete'];
    const currentIndex = steps.indexOf(lessonStep);
    if (currentIndex < steps.length - 1) {
      setLessonStep(steps[currentIndex + 1]);
      setShowFeedback(false);
      setQuizAnswer('');
    }
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem) {
      setDropZones([...dropZones, draggedItem]);
      setDraggedItem(null);
      
      // Check if interaction is complete
      if (currentLessonData.interactive.leftSide && currentLessonData.interactive.rightSide) {
        const totalItems = currentLessonData.interactive.leftSide.length + currentLessonData.interactive.rightSide.length;
        if (dropZones.length + 1 === totalItems) {
          setShowFeedback(true);
          setFeedbackMessage(`Excellent! ${totalItems} items total! 🎉`);
        }
      }
    }
  };

  const handleInteractiveClick = (index) => {
    if (currentLessonData.interactive.toRemove) {
      // Handle subtraction clicking
      const newItems = [...currentLessonData.interactive.items];
      newItems[index] = '❌';
      // Update the interactive data (in real app, this would be managed better)
      setShowFeedback(true);
      setFeedbackMessage("Good job! Keep clicking to remove more!");
    }
  };

  const handleQuizAnswer = (selectedIndex) => {
    setQuizAnswer(selectedIndex);
    const isCorrect = selectedIndex === currentLessonData.quiz.correct;
    
    if (isCorrect) {
      setShowFeedback(true);
      setFeedbackMessage(currentLessonData.quiz.explanation);
      
      // Mark lesson as completed
      if (!completedLessons.includes(currentLesson)) {
        setCompletedLessons([...completedLessons, currentLesson]);
      }
      
      setTimeout(() => {
        setLessonStep('complete');
      }, 2000);
    } else {
      setShowFeedback(true);
      setFeedbackMessage("Not quite right! Try again - you can do it! 💪");
      setTimeout(() => {
        setShowFeedback(false);
        setQuizAnswer('');
      }, 2000);
    }
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setLessonStep('intro');
      setDropZones([]);
      setQuizAnswer('');
      setShowFeedback(false);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setLessonStep('intro');
      setDropZones([]);
      setQuizAnswer('');
      setShowFeedback(false);
    }
  };

  const renderIntroStep = () => (
    <div className="text-center">
      <div className="text-8xl mb-6 animate-bounce">{currentLessonData.icon}</div>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">{currentLessonData.title}</h2>
      <p className="text-xl text-gray-600 mb-8">{currentLessonData.subtitle}</p>
      <button
        onClick={nextStep}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center mx-auto"
      >
        <PlayCircle className="mr-2" size={24} />
        Start Learning!
      </button>
    </div>
  );

  const renderVisualStep = () => (
    <div className="text-center">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Let's See How It Works!</h3>
      <div className="bg-blue-50 rounded-2xl p-8 mb-6">
        <div className="text-2xl font-bold text-blue-800 mb-4">{currentLessonData.visual.problem}</div>
        <div className="flex justify-center items-center space-x-4 mb-6">
          {currentLessonData.visual.items.map((item, index) => (
            <div key={index} className="text-4xl animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}>
              {Array.isArray(item) ? (
                <div className="flex space-x-2">
                  {item.map((subItem, subIndex) => (
                    <span key={subIndex}>{subItem}</span>
                  ))}
                </div>
              ) : (
                item
              )}
            </div>
          ))}
        </div>
        <p className="text-lg text-blue-700">{currentLessonData.visual.explanation}</p>
      </div>
      <button
        onClick={nextStep}
        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Got It! Let's Practice!
      </button>
    </div>
  );

  const renderInteractiveStep = () => (
    <div className="text-center">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Your Turn to Try!</h3>
      <p className="text-lg text-gray-600 mb-6">{currentLessonData.interactive.instruction}</p>
      
      <div className="bg-yellow-50 rounded-2xl p-8 mb-6">
        {currentLessonData.interactive.leftSide && currentLessonData.interactive.rightSide ? (
          <div className="grid grid-cols-3 gap-8 items-center">
            <div>
              <p className="text-sm text-gray-600 mb-2">First Group</p>
              <div className="space-y-2">
                {currentLessonData.interactive.leftSide.map((item, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="text-3xl cursor-move hover:scale-110 transition-transform inline-block mr-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Second Group</p>
              <div className="space-y-2">
                {currentLessonData.interactive.rightSide.map((item, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="text-3xl cursor-move hover:scale-110 transition-transform inline-block mr-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Drop Here!</p>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="min-h-32 border-4 border-dashed border-purple-300 rounded-2xl p-4 bg-purple-50 flex flex-wrap"
              >
                {dropZones.map((item, index) => (
                  <div key={index} className="text-3xl mr-2 mb-2">{item}</div>
                ))}
              </div>
            </div>
          </div>
        ) : currentLessonData.interactive.items ? (
          <div className="flex justify-center flex-wrap gap-4">
            {currentLessonData.interactive.items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInteractiveClick(index)}
                className="text-4xl cursor-pointer hover:scale-110 transition-transform"
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {currentLessonData.interactive.groups.map((group, groupIndex) => (
              <div key={groupIndex} className="bg-white rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Group {groupIndex + 1}</p>
                <div className="flex justify-center space-x-2">
                  {group.map((item, itemIndex) => (
                    <span key={itemIndex} className="text-3xl">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showFeedback && (
        <div className="bg-green-100 border border-green-400 rounded-2xl p-4 mb-6">
          <p className="text-green-800 font-bold text-lg">{feedbackMessage}</p>
        </div>
      )}
      
      <button
        onClick={nextStep}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Ready for Quiz!
      </button>
    </div>
  );

  const renderQuizStep = () => (
    <div className="text-center">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Quick Quiz Time! 🧠</h3>
      <div className="bg-purple-50 rounded-2xl p-8 mb-6">
        <div className="text-2xl font-bold text-purple-800 mb-6">{currentLessonData.quiz.question}</div>
        <div className="grid grid-cols-2 gap-4">
          {currentLessonData.quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleQuizAnswer(index)}
              disabled={quizAnswer !== ''}
              className={`p-4 rounded-xl text-xl font-bold transition-all duration-300 ${
                quizAnswer === index && index === currentLessonData.quiz.correct
                  ? 'bg-green-100 border-2 border-green-400 text-green-800'
                  : quizAnswer === index
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
          quizAnswer === currentLessonData.quiz.correct 
            ? 'bg-green-100 border-green-400' 
            : 'bg-red-100 border-red-400'
        }`}>
          <p className={`font-bold text-lg ${
            quizAnswer === currentLessonData.quiz.correct 
              ? 'text-green-800' 
              : 'text-red-800'
          }`}>
            {feedbackMessage}
          </p>
        </div>
      )}
    </div>
  );

  const renderCompleteStep = () => (
    <div className="text-center">
      <div className="text-8xl mb-6 animate-bounce">🎉</div>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Lesson Complete!</h2>
      <p className="text-xl text-gray-600 mb-8">You're a math superstar! 🌟</p>
      
      <div className="bg-green-100 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="text-yellow-500 mr-2" size={32} />
          <span className="text-2xl font-bold text-green-800">Great Job!</span>
        </div>
        <p className="text-green-700">You've mastered {currentLessonData.title}!</p>
      </div>

      <div className="space-y-4">
        {currentLesson < lessons.length - 1 && (
          <button
            onClick={nextLesson}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center mx-auto"
          >
            <ChevronRight className="mr-2" size={24} />
            Next Lesson
          </button>
        )}
        
        <button
          onClick={() => setLessonStep('intro')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Review This Lesson
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (lessonStep) {
      case 'intro': return renderIntroStep();
      case 'visual': return renderVisualStep();
      case 'interactive': return renderInteractiveStep();
      case 'quiz': return renderQuizStep();
      case 'complete': return renderCompleteStep();
      default: return renderIntroStep();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Book className="text-blue-500 mr-3" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">Math Lessons</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevLesson}
                disabled={currentLesson === 0}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-semibold text-gray-600">
                {currentLesson + 1} / {lessons.length}
              </span>
              <button
                onClick={nextLesson}
                disabled={currentLesson === lessons.length - 1}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getStepProgress()}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600">
            Step {['intro', 'visual', 'interactive', 'quiz', 'complete'].indexOf(lessonStep) + 1} of 5
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {renderCurrentStep()}
        </div>

        {/* Lesson Navigation */}
        <div className="mt-6 bg-white rounded-3xl shadow-2xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">All Lessons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setCurrentLesson(index);
                  setLessonStep('intro');
                  setDropZones([]);
                  setQuizAnswer('');
                  setShowFeedback(false);
                }}
                className={`p-4 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                  index === currentLesson
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{lesson.icon}</span>
                  {completedLessons.includes(index) && (
                    <CheckCircle className="text-green-500" size={20} />
                  )}
                </div>
                <h4 className="font-bold text-lg">{lesson.title}</h4>
                <p className="text-sm opacity-80">{lesson.subtitle}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;