import React from 'react';
import { motion } from 'framer-motion';

const AnimatedChart = ({ type, data, title }) => {
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const renderChart = () => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    switch(type) {
      case 'bar':
        return (
          <div className="h-64 flex items-end justify-between space-x-2">
            {data.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <motion.div
                  className="w-full bg-blue-500 rounded-t"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / maxValue) * 200}px` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                />
                <span className="text-xs mt-2 text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        );
      case 'pie':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              {data.map((item, index) => {
                const percentage = (item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100;
                return (
                  <div key={index} className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-32 h-32 rounded-full border-8"
                      style={{ 
                        borderColor: colors[index % colors.length],
                        transform: `rotate(${index * 90}deg)`
                      }}
                    />
                    <span className="absolute text-sm font-medium">{item.name}: {percentage.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'line':
      default:
        return (
          <div className="h-64 flex items-end justify-between">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  className="w-2 bg-emerald-500 rounded-full"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / maxValue) * 200}px` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                />
                <span className="text-xs mt-2 text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <motion.div
      className="card"
      variants={chartVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="p-4">
        {renderChart()}
      </div>
    </motion.div>
  );
};

export default AnimatedChart;