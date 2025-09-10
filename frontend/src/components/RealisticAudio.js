import { useEffect, useRef } from 'react';

const RealisticAudio = ({ scene, isPlaying = true }) => {
  const audioContextRef = useRef(null);

  const createRealisticSound = (type, params = {}) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    switch (type) {
      case 'cyberpunk_intro':
        // Deep bass with digital glitch
        const bass = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bass.connect(bassGain);
        bassGain.connect(ctx.destination);
        bass.frequency.setValueAtTime(80, now);
        bass.frequency.exponentialRampToValueAtTime(60, now + 2);
        bassGain.gain.setValueAtTime(0.3, now);
        bassGain.gain.exponentialRampToValueAtTime(0.01, now + 2);
        bass.start(now);
        bass.stop(now + 2);

        // Digital beeps
        setTimeout(() => {
          for (let i = 0; i < 3; i++) {
            const beep = ctx.createOscillator();
            const beepGain = ctx.createGain();
            beep.connect(beepGain);
            beepGain.connect(ctx.destination);
            beep.frequency.value = 800 + (i * 200);
            beep.type = 'square';
            beepGain.gain.setValueAtTime(0.1, ctx.currentTime);
            beepGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            beep.start(ctx.currentTime);
            beep.stop(ctx.currentTime + 0.2);
          }
        }, 500);
        break;

      case 'system_hack':
        // Rapid digital processing sounds
        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            
            osc.frequency.value = 400 + Math.random() * 800;
            osc.type = 'sawtooth';
            filter.type = 'lowpass';
            filter.frequency.value = 1000 + Math.random() * 2000;
            
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.1);
          }, i * 50);
        }
        break;

      case 'mission_success':
        // Triumphant chord progression
        const frequencies = [523.25, 659.25, 783.99]; // C, E, G
        frequencies.forEach((freq, index) => {
          setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 1);
          }, index * 200);
        });
        break;

      case 'ambient_hub':
        // Continuous low hum with occasional digital chirps
        const hum = ctx.createOscillator();
        const humGain = ctx.createGain();
        hum.connect(humGain);
        humGain.connect(ctx.destination);
        hum.frequency.value = 120;
        hum.type = 'sine';
        humGain.gain.setValueAtTime(0.02, now);
        hum.start(now);
        hum.stop(now + 5);

        // Random chirps
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            const chirp = ctx.createOscillator();
            const chirpGain = ctx.createGain();
            chirp.connect(chirpGain);
            chirpGain.connect(ctx.destination);
            chirp.frequency.setValueAtTime(1200, ctx.currentTime);
            chirp.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
            chirp.type = 'sine';
            chirpGain.gain.setValueAtTime(0.03, ctx.currentTime);
            chirpGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            chirp.start(ctx.currentTime);
            chirp.stop(ctx.currentTime + 0.1);
          }, Math.random() * 3000);
        }
        break;

      case 'final_victory':
        // Epic victory fanfare
        const melody = [523, 659, 784, 1047]; // C, E, G, C
        melody.forEach((freq, index) => {
          setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const reverb = ctx.createConvolver();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.frequency.value = freq;
            osc.type = 'triangle';
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
            
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.8);
          }, index * 300);
        });
        break;
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const soundMap = {
      intro: 'cyberpunk_intro',
      hub: 'ambient_hub',
      quizSystem: 'system_hack',
      challengeNetwork: 'system_hack',
      leaderboardCore: 'system_hack',
      userProfiles: 'system_hack',
      quizSuccess: 'mission_success',
      challengeSuccess: 'mission_success',
      leaderboardSuccess: 'mission_success',
      profileSuccess: 'mission_success',
      finalSuccess: 'final_victory'
    };

    const soundType = soundMap[scene] || 'ambient_hub';
    createRealisticSound(soundType);

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [scene, isPlaying]);

  return null;
};

export default RealisticAudio;