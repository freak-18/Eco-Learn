import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  PlayIcon, 
  TrophyIcon, 
  FireIcon, 
  StarIcon,
  BoltIcon,
  GlobeAltIcon,
  HeartIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const GameifiedDashboard = () => {
  const { user } = useAuth();
  const [currentScene, setCurrentScene] = useState('home');
  const [playerStats, setPlayerStats] = useState({
    health: 85,
    energy: 70,
    knowledge: 60,
    impact: 45
  });
  const [achievements, setAchievements] = useState([]);
  const [showReward, setShowReward] = useState(false);

  const scenes = {
    home: {
      title: "EcoWorld Hub",
      background: "bg-gradient-to-br from-green-400 via-blue-500 to-purple-600",
      description: "Welcome to your environmental adventure!"
    },
    forest: {
      title: "Green Forest",
      background: "bg-gradient-to-br from-green-600 via-green-400 to-emerald-300",
      description: "Explore the mysteries of nature"
    },
    ocean: {
      title: "Blue Ocean",
      background: "bg-gradient-to-br from-blue-600 via-cyan-400 to-teal-300",
      description: "Dive into marine conservation"
    },
    city: {
      title: "Smart City",
      background: "bg-gradient-to-br from-gray-600 via-blue-400 to-indigo-300",
      description: "Build sustainable urban solutions"
    }
  };

  const gameActions = [
    {
      id: 'plant-tree',
      title: 'Plant a Tree',
      icon: '🌱',
      points: 50,
      scene: 'forest',
      description: 'Help reforest the planet',
      color: 'bg-green-500'
    },
    {
      id: 'clean-ocean',
      title: 'Clean Ocean',
      icon: '🌊',
      points: 75,
      scene: 'ocean',
      description: 'Remove plastic pollution',
      color: 'bg-blue-500'
    },
    {
      id: 'solar-panel',
      title: 'Install Solar',
      icon: '☀️',
      points: 100,
      scene: 'city',
      description: 'Power the city sustainably',
      color: 'bg-yellow-500'
    },
    {
      id: 'recycle',
      title: 'Recycle Waste',
      icon: '♻️',
      points: 30,
      scene: 'city',
      description: 'Sort and recycle materials',
      color: 'bg-purple-500'
    }
  ];

  const performAction = (action) => {
    setPlayerStats(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 10),
      impact: Math.min(100, prev.impact + 15),
      knowledge: Math.min(100, prev.knowledge + 5)
    }));
    
    setShowReward(true);
    setTimeout(() => setShowReward(false), 2000);
    
    // Add achievement
    if (!achievements.includes(action.id)) {
      setAchievements(prev => [...prev, action.id]);
    }
  };

  const StatBar = ({ label, value, color, icon: Icon }) => (
    <div className="flex items-center space-x-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg">
      <Icon className="h-6 w-6 text-white" />
      <div className="flex-1">
        <div className="flex justify-between text-white text-sm mb-1">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${scenes[currentScene].background} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Game UI */}
      <div className="relative z-10 p-4 sm:p-6">
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {scenes[currentScene].title}
            </h1>
            <p className="text-white/80">{scenes[currentScene].description}</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <TrophyIcon className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-bold">{user?.ecoPoints || 0}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <StarIcon className="h-5 w-5 text-purple-400" />
              <span className="text-white font-bold">Level {user?.level || 1}</span>
            </div>
          </div>
        </motion.div>

        {/* Player Stats */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatBar label="Planet Health" value={playerStats.health} color="bg-green-400" icon={HeartIcon} />
          <StatBar label="Energy" value={playerStats.energy} color="bg-yellow-400" icon={BoltIcon} />
          <StatBar label="Knowledge" value={playerStats.knowledge} color="bg-blue-400" icon={ShieldCheckIcon} />
          <StatBar label="Impact" value={playerStats.impact} color="bg-purple-400" icon={GlobeAltIcon} />
        </motion.div>

        {/* Scene Navigation */}
        <motion.div 
          className="flex justify-center space-x-4 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {Object.entries(scenes).map(([key, scene]) => (
            <motion.button
              key={key}
              onClick={() => setCurrentScene(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                currentScene === key 
                  ? 'bg-white text-gray-900 shadow-lg' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {scene.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Game Actions */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {gameActions
            .filter(action => action.scene === currentScene || currentScene === 'home')
            .map((action, index) => (
            <motion.div
              key={action.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center cursor-pointer group"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => performAction(action)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{action.title}</h3>
              <p className="text-white/80 text-sm mb-4">{action.description}</p>
              <div className="flex items-center justify-center space-x-2">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span className="text-white font-medium">+{action.points} pts</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-white font-bold text-xl mb-4 flex items-center">
            <TrophyIcon className="h-6 w-6 mr-2 text-yellow-400" />
            Achievements Unlocked
          </h3>
          <div className="flex flex-wrap gap-3">
            {achievements.map((achievementId, index) => {
              const action = gameActions.find(a => a.id === achievementId);
              return (
                <motion.div
                  key={achievementId}
                  className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <span className="text-2xl">{action?.icon}</span>
                  <span className="text-white text-sm font-medium">{action?.title}</span>
                </motion.div>
              );
            })}
            {achievements.length === 0 && (
              <p className="text-white/60">Complete actions to unlock achievements!</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Reward Animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-yellow-400 text-yellow-900 px-8 py-4 rounded-full font-bold text-xl shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              🎉 Great Job! +Points Earned! 🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameifiedDashboard;