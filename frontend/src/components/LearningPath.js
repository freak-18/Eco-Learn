import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, LockClosedIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

const LearningPath = ({ userProgress = 3 }) => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    { id: 1, title: "Climate Basics", description: "Understanding global warming", points: 100, completed: true },
    { id: 2, title: "Carbon Footprint", description: "Calculate your impact", points: 150, completed: true },
    { id: 3, title: "Renewable Energy", description: "Solar, wind, and hydro power", points: 200, completed: true },
    { id: 4, title: "Sustainable Living", description: "Daily eco-friendly practices", points: 250, completed: false, current: true },
    { id: 5, title: "Conservation", description: "Protecting ecosystems", points: 300, completed: false },
    { id: 6, title: "Green Technology", description: "Innovation for sustainability", points: 350, completed: false },
  ];

  const getStepStatus = (step) => {
    if (step.completed) return 'completed';
    if (step.current) return 'current';
    return 'locked';
  };

  const getStepColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-emerald-500';
      case 'current': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Learning Path</h3>
        <div className="text-sm text-gray-600">
          Progress: {userProgress}/{steps.length} completed
        </div>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        <motion.div 
          className="absolute left-6 top-0 w-0.5 bg-emerald-500"
          initial={{ height: 0 }}
          animate={{ height: `${(userProgress / steps.length) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        ></motion.div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => {
            const status = getStepStatus(step);
            return (
              <motion.div
                key={step.id}
                className="relative flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredStep(step.id)}
                onHoverEnd={() => setHoveredStep(null)}
              >
                {/* Step Circle */}
                <div className={`relative z-10 w-12 h-12 ${getStepColor(status)} rounded-full flex items-center justify-center`}>
                  {status === 'completed' && <CheckCircleIcon className="h-6 w-6 text-white" />}
                  {status === 'current' && <PlayCircleIcon className="h-6 w-6 text-white" />}
                  {status === 'locked' && <LockClosedIcon className="h-6 w-6 text-gray-500" />}
                </div>

                {/* Step Content */}
                <motion.div 
                  className={`flex-1 pb-6 ${status !== 'locked' ? 'cursor-pointer' : ''}`}
                  whileHover={status !== 'locked' ? { scale: 1.02 } : {}}
                >
                  <div className={`p-4 rounded-lg border-2 transition-all ${
                    hoveredStep === step.id && status !== 'locked' 
                      ? 'border-emerald-300 bg-emerald-50' 
                      : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold ${status === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>
                        {step.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                        status === 'current' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        +{step.points} pts
                      </span>
                    </div>
                    <p className={`text-sm ${status === 'locked' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {step.description}
                    </p>
                    
                    {status === 'current' && (
                      <motion.button
                        className="mt-3 btn-primary text-sm px-4 py-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Continue Learning
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;