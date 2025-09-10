import React from 'react';

const QuizLogo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizes[size]} bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg ${className}`}>
      <span className="text-white text-2xl">📝</span>
    </div>
  );
};

export default QuizLogo;