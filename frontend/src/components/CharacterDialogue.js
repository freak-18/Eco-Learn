import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterAvatar from './CharacterAvatar';

const CharacterDialogue = ({ character, dialogue, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const characters = {
    echo: {
      name: 'Agent Echo',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900/30',
      borderColor: 'border-cyan-500'
    },
    ai: {
      name: 'EcoLearn AI',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/30',
      borderColor: 'border-blue-500'
    },
    system: {
      name: 'System',
      color: 'text-green-400',
      bgColor: 'bg-green-900/30',
      borderColor: 'border-green-500'
    },
    mentor: {
      name: 'Dr. Green',
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/30',
      borderColor: 'border-purple-500'
    }
  };

  const char = characters[character] || characters.echo;

  useEffect(() => {
    if (currentIndex < dialogue.length) {
      const timer = setTimeout(() => {
        setCurrentText(dialogue.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
      if (onComplete) {
        setTimeout(onComplete, 1000);
      }
    }
  }, [currentIndex, dialogue, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`${char.bgColor} ${char.borderColor} border rounded-lg p-4 mb-4`}
      >
        <div className="flex items-start space-x-3">
          <CharacterAvatar character={character} size="sm" animate={false} />
          <div className="flex-1">
            <div className={`${char.color} font-mono font-bold mb-2`}>
              {char.name}
            </div>
            <div className="text-gray-300 font-mono text-sm">
              {currentText}
              {isTyping && <span className="animate-pulse">|</span>}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CharacterDialogue;