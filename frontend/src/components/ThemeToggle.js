import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      <span
        className={`theme-toggle-slider ${
          isDark ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      >
        {isDark ? (
          <MoonIcon className="h-3 w-3 text-gray-600" />
        ) : (
          <SunIcon className="h-3 w-3 text-yellow-600" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;