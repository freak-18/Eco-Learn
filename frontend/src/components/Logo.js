import React from 'react';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-lg' },
    md: { container: 'w-10 h-10', text: 'text-xl' },
    lg: { container: 'w-12 h-12', text: 'text-2xl' },
    xl: { container: 'w-16 h-16', text: 'text-3xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${currentSize.container} bg-emerald-600 rounded-lg flex items-center justify-center`}>
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      
      {showText && (
        <span className={`font-bold text-emerald-600 ${currentSize.text}`}>
          EcoLearn
        </span>
      )}
    </div>
  );
};

export default Logo;