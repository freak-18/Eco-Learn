import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const InteractiveStoryMode = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [score, setScore] = useState(0);

  const story = [
    {
      id: 1,
      title: "The Climate Crisis Begins",
      scene: "🌍",
      text: "You are the Earth's guardian. The planet's temperature is rising rapidly. What's your first action?",
      choices: [
        { text: "Reduce carbon emissions immediately", points: 10, next: 1 },
        { text: "Plant more trees", points: 8, next: 1 },
        { text: "Ignore the problem", points: -5, next: 2 }
      ],
      background: "bg-gradient-to-br from-red-400 to-orange-500"
    },
    {
      id: 2,
      title: "The Forest Solution",
      scene: "🌲",
      text: "Great choice! You've started reforestation. But illegal logging continues. How do you respond?",
      choices: [
        { text: "Create protected areas", points: 15, next: 2 },
        { text: "Educate local communities", points: 12, next: 2 },
        { text: "Use technology to monitor forests", points: 10, next: 2 }
      ],
      background: "bg-gradient-to-br from-green-400 to-emerald-500"
    },
    {
      id: 3,
      title: "The Ocean Crisis",
      scene: "🌊",
      text: "The oceans are full of plastic! Marine life is dying. What's your strategy?",
      choices: [
        { text: "Ban single-use plastics", points: 20, next: 3 },
        { text: "Create ocean cleanup systems", points: 15, next: 3 },
        { text: "Promote recycling programs", points: 12, next: 3 }
      ],
      background: "bg-gradient-to-br from-blue-400 to-cyan-500"
    },
    {
      id: 4,
      title: "Renewable Energy Revolution",
      scene: "⚡",
      text: "It's time to transition to clean energy. Which technology do you prioritize?",
      choices: [
        { text: "Solar power everywhere", points: 18, next: 4 },
        { text: "Wind energy farms", points: 16, next: 4 },
        { text: "Hydroelectric dams", points: 14, next: 4 }
      ],
      background: "bg-gradient-to-br from-yellow-400 to-orange-400"
    },
    {
      id: 5,
      title: "The Final Challenge",
      scene: "🏆",
      text: "You've made great progress! Now face the ultimate test: convincing world leaders to act. Your approach?",
      choices: [
        { text: "Present scientific evidence", points: 25, next: 5 },
        { text: "Show economic benefits", points: 20, next: 5 },
        { text: "Rally public support", points: 22, next: 5 }
      ],
      background: "bg-gradient-to-br from-purple-400 to-pink-500"
    }
  ];

  const makeChoice = (choice) => {
    setUserChoices([...userChoices, choice]);
    setScore(score + choice.points);
    
    if (currentChapter < story.length - 1) {
      setTimeout(() => {
        setCurrentChapter(currentChapter + 1);
      }, 1000);
    }
  };

  const resetStory = () => {
    setCurrentChapter(0);
    setUserChoices([]);
    setScore(0);
  };

  const getScoreMessage = () => {
    if (score >= 80) return "🌟 Earth Guardian Master! You saved the planet!";
    if (score >= 60) return "🌱 Eco Hero! Great environmental leadership!";
    if (score >= 40) return "♻️ Green Warrior! Good effort for the planet!";
    return "🌍 Keep learning! Every action counts!";
  };

  const currentStory = story[currentChapter];
  const isComplete = currentChapter >= story.length - 1 && userChoices.length > 0;

  return (
    <div className={`min-h-screen ${currentStory?.background || 'bg-gray-900'} relative overflow-hidden`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <motion.div 
          className="max-w-4xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div 
              className="text-8xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {currentStory?.scene}
            </motion.div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-white font-bold">Chapter {currentChapter + 1}/{story.length}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-white font-bold">Score: {score}</span>
              </div>
            </div>
          </div>

          {!isComplete ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6">{currentStory.title}</h2>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">{currentStory.text}</p>
                
                <div className="space-y-4">
                  {currentStory.choices.map((choice, index) => (
                    <motion.button
                      key={index}
                      onClick={() => makeChoice(choice)}
                      className="w-full p-4 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-between group"
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <span className="text-left">{choice.text}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-300 font-bold">+{choice.points}</span>
                        <ChevronRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-4xl font-bold text-white mb-4">Story Complete!</h2>
              <p className="text-2xl text-white/90 mb-6">{getScoreMessage()}</p>
              <div className="text-xl text-white/80 mb-8">Final Score: {score} points</div>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white">Your Journey:</h3>
                {userChoices.map((choice, index) => (
                  <div key={index} className="bg-white/20 rounded-lg p-3 text-white">
                    <span className="font-medium">Chapter {index + 1}:</span> {choice.text} 
                    <span className="text-yellow-300 ml-2">(+{choice.points} pts)</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={resetStory}
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Play Again
              </button>
            </motion.div>
          )}

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${((currentChapter + 1) / story.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveStoryMode;