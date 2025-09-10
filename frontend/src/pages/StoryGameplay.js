import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  PlayIcon, 
  PauseIcon, 
  ArrowRightIcon,
  HeartIcon,
  StarIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const StoryGameplay = () => {
  const { user } = useAuth();
  const [currentStory, setCurrentStory] = useState(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [playerStats, setPlayerStats] = useState({
    health: 100,
    knowledge: 0,
    influence: 0,
    ecoPoints: 0
  });
  const [inventory, setInventory] = useState([]);
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, completed
  const [choices, setChoices] = useState([]);

  const stories = [
    {
      id: 'climate-hero',
      title: 'Climate Hero: The Last Hope',
      description: 'Lead the fight against climate change in a world on the brink',
      difficulty: 'Medium',
      duration: '15-20 min',
      thumbnail: '🌍',
      scenes: [
        {
          id: 1,
          background: 'bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500',
          character: '🧑‍🔬',
          location: 'Climate Research Center',
          text: "Dr. Sarah, the world's temperature has risen by 3°C. We have 10 years to reverse this. What's your first move?",
          choices: [
            { 
              text: 'Rally world leaders for immediate action', 
              effect: { influence: +20, knowledge: +10 },
              next: 2,
              consequence: 'World leaders agree to emergency climate summit'
            },
            { 
              text: 'Focus on developing new green technology', 
              effect: { knowledge: +25, ecoPoints: +50 },
              next: 3,
              consequence: 'You discover breakthrough carbon capture technology'
            },
            { 
              text: 'Start grassroots environmental movement', 
              effect: { influence: +15, health: +10 },
              next: 4,
              consequence: 'Millions join your environmental movement'
            }
          ]
        },
        {
          id: 2,
          background: 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600',
          character: '🏛️',
          location: 'United Nations Assembly',
          text: "The climate summit is underway. World leaders are divided. How do you convince them?",
          choices: [
            { 
              text: 'Present devastating climate data', 
              effect: { knowledge: +15, influence: +10 },
              next: 5,
              consequence: 'Leaders are shocked by the evidence'
            },
            { 
              text: 'Show economic benefits of green transition', 
              effect: { influence: +20, ecoPoints: +30 },
              next: 6,
              consequence: 'Countries commit $2 trillion to green economy'
            }
          ]
        }
      ]
    },
    {
      id: 'ocean-guardian',
      title: 'Ocean Guardian: Depths of Crisis',
      description: 'Dive deep to save marine life from plastic pollution',
      difficulty: 'Easy',
      duration: '10-15 min',
      thumbnail: '🌊',
      scenes: [
        {
          id: 1,
          background: 'bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400',
          character: '🤿',
          location: 'Pacific Ocean',
          text: "You're a marine biologist discovering a massive plastic island. Sea turtles are trapped. What do you do?",
          choices: [
            { 
              text: 'Rescue the turtles immediately', 
              effect: { health: +15, ecoPoints: +40 },
              next: 2,
              consequence: 'You save 50 sea turtles from plastic nets'
            },
            { 
              text: 'Document the pollution for evidence', 
              effect: { knowledge: +20, influence: +10 },
              next: 3,
              consequence: 'Your footage goes viral, raising awareness'
            },
            { 
              text: 'Call for international cleanup mission', 
              effect: { influence: +25, ecoPoints: +30 },
              next: 4,
              consequence: '20 countries pledge cleanup support'
            }
          ]
        }
      ]
    },
    {
      id: 'forest-keeper',
      title: 'Forest Keeper: Amazon\'s Last Stand',
      description: 'Protect the Amazon rainforest from deforestation',
      difficulty: 'Hard',
      duration: '20-25 min',
      thumbnail: '🌳',
      scenes: [
        {
          id: 1,
          background: 'bg-gradient-to-br from-green-600 via-emerald-500 to-green-400',
          character: '🧑‍🌾',
          location: 'Amazon Rainforest',
          text: "Illegal loggers are destroying 1000 acres daily. Indigenous communities need your help. Your strategy?",
          choices: [
            { 
              text: 'Work with indigenous leaders', 
              effect: { influence: +30, knowledge: +15 },
              next: 2,
              consequence: 'Indigenous wisdom guides your conservation efforts'
            },
            { 
              text: 'Use satellite technology to track deforestation', 
              effect: { knowledge: +25, ecoPoints: +35 },
              next: 3,
              consequence: 'You create real-time deforestation alerts'
            },
            { 
              text: 'Lobby for international protection laws', 
              effect: { influence: +20, health: +5 },
              next: 4,
              consequence: 'UN declares Amazon a protected zone'
            }
          ]
        }
      ]
    }
  ];

  const selectStory = (story) => {
    setCurrentStory(story);
    setCurrentScene(0);
    setPlayerStats({ health: 100, knowledge: 0, influence: 0, ecoPoints: 0 });
    setInventory([]);
    setChoices([]);
    setGameState('playing');
  };

  const makeChoice = (choice) => {
    // Update player stats
    setPlayerStats(prev => ({
      ...prev,
      ...Object.keys(choice.effect).reduce((acc, key) => {
        acc[key] = Math.max(0, Math.min(100, prev[key] + choice.effect[key]));
        return acc;
      }, {})
    }));

    // Record choice
    setChoices(prev => [...prev, choice]);

    // Move to next scene or complete story
    if (choice.next && choice.next <= currentStory.scenes.length) {
      setTimeout(() => {
        setCurrentScene(choice.next - 1);
      }, 1500);
    } else {
      setTimeout(() => {
        setGameState('completed');
      }, 1500);
    }
  };

  const resetGame = () => {
    setCurrentStory(null);
    setCurrentScene(0);
    setGameState('menu');
    setChoices([]);
  };

  const StatBar = ({ label, value, color, icon: Icon }) => (
    <div className="flex items-center space-x-2">
      <Icon className="h-5 w-5 text-white" />
      <div className="flex-1">
        <div className="flex justify-between text-white text-sm mb-1">
          <span>{label}</span>
          <span>{value}</span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4">EcoStory Adventures</h1>
            <p className="text-xl text-white/80">Choose your environmental adventure</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 cursor-pointer group hover:bg-white/20 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => selectStory(story)}
              >
                <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
                  {story.thumbnail}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{story.title}</h3>
                <p className="text-white/80 mb-4">{story.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    story.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                    story.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {story.difficulty}
                  </span>
                  <span className="text-white/60 text-sm">{story.duration}</span>
                </div>
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <PlayIcon className="h-5 w-5" />
                  <span>Start Adventure</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    const totalScore = playerStats.knowledge + playerStats.influence + playerStats.ecoPoints;
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 flex items-center justify-center">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-4 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-4xl font-bold text-white mb-4">Adventure Complete!</h2>
          <p className="text-xl text-white/90 mb-6">You've made a real difference for the planet!</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{playerStats.knowledge}</div>
              <div className="text-white/80">Knowledge</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{playerStats.influence}</div>
              <div className="text-white/80">Influence</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{playerStats.ecoPoints}</div>
              <div className="text-white/80">Eco Points</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{totalScore}</div>
              <div className="text-white/80">Total Score</div>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <h3 className="text-xl font-bold text-white">Your Journey:</h3>
            {choices.map((choice, index) => (
              <div key={index} className="bg-white/20 rounded-lg p-3 text-left">
                <div className="text-white font-medium">{choice.text}</div>
                <div className="text-white/70 text-sm">{choice.consequence}</div>
              </div>
            ))}
          </div>

          <button
            onClick={resetGame}
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Play Another Story
          </button>
        </motion.div>
      </div>
    );
  }

  const scene = currentStory.scenes[currentScene];
  
  return (
    <div className={`min-h-screen ${scene.background} relative overflow-hidden`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Game UI */}
      <div className="relative z-10 p-4">
        {/* Top HUD */}
        <div className="flex justify-between items-start mb-8">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 min-w-[300px]">
            <h3 className="text-white font-bold mb-3">Player Stats</h3>
            <div className="space-y-2">
              <StatBar label="Health" value={playerStats.health} color="bg-red-400" icon={HeartIcon} />
              <StatBar label="Knowledge" value={playerStats.knowledge} color="bg-blue-400" icon={BookOpenIcon} />
              <StatBar label="Influence" value={playerStats.influence} color="bg-purple-400" icon={StarIcon} />
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-white text-center">
              <div className="text-2xl font-bold">{playerStats.ecoPoints}</div>
              <div className="text-sm">Eco Points</div>
            </div>
          </div>
        </div>

        {/* Main Story Area */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {/* Character and Location */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{scene.character}</div>
                  <div>
                    <div className="text-white font-bold text-xl">{scene.location}</div>
                    <div className="text-white/70">Scene {currentScene + 1} of {currentStory.scenes.length}</div>
                  </div>
                </div>
              </div>

              {/* Story Text */}
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <p className="text-white text-lg leading-relaxed">{scene.text}</p>
              </div>

              {/* Choices */}
              <div className="space-y-4">
                {scene.choices.map((choice, index) => (
                  <motion.button
                    key={index}
                    onClick={() => makeChoice(choice)}
                    className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg text-white text-left transition-all group"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{choice.text}</span>
                      <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                    <div className="text-sm text-white/70 mt-2">
                      Effects: {Object.entries(choice.effect).map(([key, value]) => 
                        `${key} ${value > 0 ? '+' : ''}${value}`
                      ).join(', ')}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="fixed bottom-4 left-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex justify-between text-white text-sm mb-2">
              <span>{currentStory.title}</span>
              <span>{currentScene + 1} / {currentStory.scenes.length}</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <motion.div
                className="h-2 bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentScene + 1) / currentStory.scenes.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryGameplay;