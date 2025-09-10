import React from 'react';
import { motion } from 'framer-motion';

const CharacterAvatar = ({ character, size = 'md', animate = true }) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  const characters = {
    echo: {
      gradient: 'from-cyan-400 via-blue-500 to-purple-600',
      shadow: 'shadow-cyan-500/50',
      features: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="echoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#echoGrad)" />
          <circle cx="35" cy="40" r="3" fill="#ffffff" />
          <circle cx="65" cy="40" r="3" fill="#ffffff" />
          <path d="M30 65 Q50 75 70 65" stroke="#ffffff" strokeWidth="2" fill="none" />
          <rect x="20" y="20" width="60" height="8" rx="4" fill="#ffffff" opacity="0.3" />
        </svg>
      )
    },
    ai: {
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      shadow: 'shadow-blue-500/50',
      features: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="80" height="80" rx="15" fill="url(#aiGrad)" />
          <circle cx="30" cy="35" r="4" fill="#ffffff" />
          <circle cx="70" cy="35" r="4" fill="#ffffff" />
          <rect x="25" y="55" width="50" height="4" rx="2" fill="#ffffff" />
          <rect x="30" y="65" width="40" height="3" rx="1.5" fill="#ffffff" opacity="0.7" />
          <rect x="35" y="73" width="30" height="2" rx="1" fill="#ffffff" opacity="0.5" />
        </svg>
      )
    },
    system: {
      gradient: 'from-green-400 via-emerald-500 to-teal-600',
      shadow: 'shadow-green-500/50',
      features: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="sysGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>
          <rect x="5" y="15" width="90" height="70" rx="8" fill="url(#sysGrad)" />
          <rect x="15" y="25" width="70" height="2" fill="#ffffff" />
          <rect x="15" y="35" width="50" height="2" fill="#ffffff" opacity="0.8" />
          <rect x="15" y="45" width="60" height="2" fill="#ffffff" opacity="0.6" />
          <rect x="15" y="55" width="40" height="2" fill="#ffffff" opacity="0.4" />
          <circle cx="75" cy="65" r="8" fill="#ffffff" opacity="0.3" />
        </svg>
      )
    },
    mentor: {
      gradient: 'from-purple-400 via-pink-500 to-rose-600',
      shadow: 'shadow-purple-500/50',
      features: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="mentorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#mentorGrad)" />
          <circle cx="38" cy="42" r="2" fill="#ffffff" />
          <circle cx="62" cy="42" r="2" fill="#ffffff" />
          <path d="M35 60 Q50 70 65 60" stroke="#ffffff" strokeWidth="2" fill="none" />
          <path d="M25 25 Q50 15 75 25" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.7" />
          <circle cx="50" cy="30" r="3" fill="#ffffff" opacity="0.5" />
        </svg>
      )
    }
  };

  const char = characters[character] || characters.echo;

  return (
    <motion.div
      className={`${sizes[size]} relative`}
      initial={animate ? { scale: 0, rotate: -180 } : {}}
      animate={animate ? { scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div className={`w-full h-full rounded-full bg-gradient-to-br ${char.gradient} ${char.shadow} shadow-lg`}>
        {char.features}
      </div>
      {animate && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

export default CharacterAvatar;