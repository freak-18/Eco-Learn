import React from 'react';

const AnimatedBackground = () => {
  return (
    <>
      {/* Floating Leaf Elements */}
      <div className="floating-element leaf-1">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
          <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" fill="currentColor" opacity="0.3"/>
        </svg>
      </div>
      
      <div className="floating-element leaf-2">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" className="text-green-400">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.06.82C6.16 17.4 9 14 17 8z" fill="currentColor" opacity="0.4"/>
        </svg>
      </div>
      
      <div className="floating-element leaf-3">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
        </svg>
      </div>
      
      {/* Wave Elements */}
      <div className="floating-element wave-1">
        <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="text-blue-400">
          <path d="M0 10c15 0 15-10 30-10s15 10 30 10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        </svg>
      </div>
      
      <div className="floating-element wave-2">
        <svg width="50" height="15" viewBox="0 0 50 15" fill="none" className="text-cyan-400">
          <path d="M0 7.5c12.5 0 12.5-7.5 25-7.5s12.5 7.5 25 7.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
        </svg>
      </div>
      
      {/* Additional Environmental Elements */}
      <div className="fixed top-1/4 left-1/3 pointer-events-none z-[-1] opacity-20">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-emerald-300 animate-pulse">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
        </svg>
      </div>
      
      <div className="fixed bottom-1/3 right-1/4 pointer-events-none z-[-1] opacity-15">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" className="text-blue-300 animate-pulse" style={{animationDelay: '2s'}}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" fill="none"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>
      </div>
    </>
  );
};

export default AnimatedBackground;