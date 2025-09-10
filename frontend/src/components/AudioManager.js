import { useEffect, useRef } from 'react';

const AudioManager = ({ scene, isPlaying = true }) => {
  const audioRef = useRef(null);
  const ambientRef = useRef(null);

  const audioFiles = {
    intro: {
      music: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      ambient: 'https://www.soundjay.com/misc/sounds/computer-beeps-1.wav'
    },
    hub: {
      music: 'https://www.soundjay.com/misc/sounds/computer-processing.wav',
      ambient: 'https://www.soundjay.com/misc/sounds/typing-on-keyboard.wav'
    },
    quizSystem: {
      music: 'https://www.soundjay.com/misc/sounds/digital-alarm.wav',
      ambient: 'https://www.soundjay.com/misc/sounds/computer-error.wav'
    },
    challengeNetwork: {
      music: 'https://www.soundjay.com/misc/sounds/electronic-beep.wav',
      ambient: 'https://www.soundjay.com/misc/sounds/computer-startup.wav'
    },
    success: {
      music: 'https://www.soundjay.com/misc/sounds/achievement.wav',
      ambient: 'https://www.soundjay.com/misc/sounds/success-bell.wav'
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const sceneAudio = audioFiles[scene] || audioFiles.hub;
    
    // Create audio elements with fallback to data URLs for basic sounds
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (ambientRef.current) {
      ambientRef.current.pause();
    }

    // Use Web Audio API to generate synthetic sounds
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const playTone = (frequency, duration, type = 'sine') => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    // Scene-specific sound effects
    switch (scene) {
      case 'intro':
        playTone(440, 0.5);
        setTimeout(() => playTone(880, 0.3), 200);
        break;
      case 'hub':
        playTone(220, 0.2, 'square');
        break;
      case 'quizSystem':
        playTone(660, 0.4, 'sawtooth');
        break;
      case 'challengeNetwork':
        playTone(330, 0.3, 'triangle');
        break;
      case 'success':
        playTone(523, 0.2);
        setTimeout(() => playTone(659, 0.2), 150);
        setTimeout(() => playTone(784, 0.4), 300);
        break;
      default:
        playTone(440, 0.1);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (ambientRef.current) {
        ambientRef.current.pause();
      }
    };
  }, [scene, isPlaying]);

  return null;
};

export default AudioManager;