import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedChart from '../components/AnimatedChart';
import InteractiveInfographic from '../components/InteractiveInfographic';
import LearningPath from '../components/LearningPath';
import InteractiveTimeline from '../components/InteractiveTimeline';
import InteractiveMap from '../components/InteractiveMap';
import GameifiedDashboard from '../components/GameifiedDashboard';
import InteractiveStoryMode from '../components/InteractiveStoryMode';
import { PlayIcon, ChartBarIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const InteractiveDashboard = () => {
  const [gameMode, setGameMode] = useState('dashboard');
  
  const chartData = {
    emissions: [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 200 },
      { name: 'Apr', value: 278 },
      { name: 'May', value: 189 },
      { name: 'Jun', value: 239 }
    ],
    energy: [
      { name: 'Solar', value: 35 },
      { name: 'Wind', value: 25 },
      { name: 'Hydro', value: 20 },
      { name: 'Nuclear', value: 15 },
      { name: 'Other', value: 5 }
    ],
    waste: [
      { name: 'Recycled', value: 32 },
      { name: 'Composted', value: 18 },
      { name: 'Landfill', value: 35 },
      { name: 'Incinerated', value: 15 }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (gameMode === 'game') {
    return <GameifiedDashboard />;
  }
  
  if (gameMode === 'story') {
    return <InteractiveStoryMode />;
  }

  return (
    <motion.div 
      className="container-responsive"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive Environmental Dashboard</h1>
            <p className="text-gray-600">Explore environmental data through interactive visualizations</p>
          </div>
          
          {/* Game Mode Selector */}
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button
              onClick={() => setGameMode('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                gameMode === 'dashboard' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChartBarIcon className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setGameMode('game')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                gameMode === 'game' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <PlayIcon className="h-4 w-4" />
              <span>Game Mode</span>
            </button>
            <button
              onClick={() => setGameMode('story')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                gameMode === 'story' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <BookOpenIcon className="h-4 w-4" />
              <span>Story Mode</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Interactive Infographic */}
        <motion.div variants={itemVariants}>
          <InteractiveInfographic />
        </motion.div>

        {/* Charts Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatedChart 
            type="line" 
            data={chartData.emissions} 
            title="CO2 Emissions Trend" 
          />
          <AnimatedChart 
            type="pie" 
            data={chartData.energy} 
            title="Renewable Energy Mix" 
          />
          <AnimatedChart 
            type="bar" 
            data={chartData.waste} 
            title="Waste Management" 
          />
        </motion.div>

        {/* Learning Path */}
        <motion.div variants={itemVariants}>
          <LearningPath />
        </motion.div>

        {/* Timeline and Map */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <InteractiveTimeline />
          <InteractiveMap />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InteractiveDashboard;