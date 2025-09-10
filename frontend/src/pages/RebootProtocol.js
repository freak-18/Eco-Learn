import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ComputerDesktopIcon, 
  BoltIcon, 
  GlobeAltIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  HomeIcon,
  AcademicCapIcon,
  SparklesIcon,
  TrophyIcon,
  UserIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import RealisticAudio from '../components/RealisticAudio';
import CharacterDialogue from '../components/CharacterDialogue';
import CharacterAvatar from '../components/CharacterAvatar';

const RebootProtocol = () => {
  const [currentScene, setCurrentScene] = useState('intro');
  const [playerStats, setPlayerStats] = useState({
    systemIntegrity: 100,
    ecoPoints: 0,
    hackingSkill: 50,
    environmentalKnowledge: 50
  });
  const [inventory, setInventory] = useState([]);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showDialogue, setShowDialogue] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState('');
  const [currentCharacter, setCurrentCharacter] = useState('echo');

  // Check if all missions are completed
  const allMissionsCompleted = completedMissions.length >= 4;

  const playDialogue = (character, text) => {
    setCurrentCharacter(character);
    setCurrentDialogue(text);
    setShowDialogue(true);
  };

  const hideDialogue = () => {
    setShowDialogue(false);
  };

  const scenes = {
    intro: {
      title: "REBOOT PROTOCOL INITIATED",
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
          >
            <ComputerDesktopIcon className="w-16 h-16 text-white" />
          </motion.div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-cyan-400 font-mono">SYSTEM ALERT</h2>
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
              <p className="text-red-300 font-mono text-sm">
                CRITICAL ERROR DETECTED<br/>
                ECOLEARN.EXE HAS STOPPED WORKING<br/>
                EDUCATIONAL SYSTEMS: FAILING<br/>
                STUDENT ENGAGEMENT: 23% AND DECLINING
              </p>
            </div>
            
            <p className="text-gray-300 max-w-2xl mx-auto">
              You are Agent Echo, an elite educational hacker. The EcoLearn platform has crashed, 
              and millions of students can't access environmental education. You're their last hope.
            </p>
            
            <div className="flex justify-center">
              <CharacterAvatar character="echo" size="xl" animate={true} />
            </div>
            
            <div className="bg-cyan-900/30 border border-cyan-500 rounded-lg p-4">
              <p className="text-cyan-300 font-mono text-sm">
                MISSION OBJECTIVE: Reboot EcoLearn's core systems<br/>
                TIME REMAINING: 72 HOURS<br/>
                AUTHORIZATION LEVEL: OMEGA
              </p>
            </div>
          </div>
        </div>
      ),
      choices: [
        { 
          text: "INITIALIZE PROTOCOL", 
          action: () => {
            playDialogue('echo', 'Alright, let\'s do this. Time to save EcoLearn and restore environmental education for millions of students worldwide!');
            setTimeout(() => setCurrentScene('hub'), 3000);
          }, 
          className: "bg-cyan-600 hover:bg-cyan-700" 
        },
        { text: "ABORT MISSION", action: () => setCurrentScene('intro'), className: "bg-red-600 hover:bg-red-700" }
      ]
    },

    hub: {
      title: "COMMAND CENTER",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-cyan-400 font-mono">SYSTEM STATUS</h3>
              <CharacterAvatar character="ai" size="sm" animate={false} />
            </div>
            <div className="space-y-3">
              {[
                { name: "Quiz.db", status: completedMissions.includes('quizSystem') ? "ONLINE" : "CORRUPTED", color: completedMissions.includes('quizSystem') ? "text-green-400" : "text-red-400" },
                { name: "Challenge.sys", status: completedMissions.includes('challengeNetwork') ? "ONLINE" : "CRITICAL", color: completedMissions.includes('challengeNetwork') ? "text-green-400" : "text-orange-400" },
                { name: "Leaderboard.exe", status: completedMissions.includes('leaderboardCore') ? "ONLINE" : "FAILING", color: completedMissions.includes('leaderboardCore') ? "text-green-400" : "text-yellow-400" },
                { name: "UserProfile.dll", status: completedMissions.includes('userProfiles') ? "ONLINE" : "UNSTABLE", color: completedMissions.includes('userProfiles') ? "text-green-400" : "text-red-400" }
              ].map((system, index) => (
                <div key={index} className="bg-gray-800/50 rounded p-3 flex justify-between items-center">
                  <span className="font-mono text-sm text-gray-300">{system.name}</span>
                  <span className={`font-mono text-xs ${system.color}`}>{system.status}</span>
                </div>
              ))}
            </div>
            
            {allMissionsCompleted && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  playDialogue('ai', 'All systems restored, Agent Echo. Initiating final reboot sequence. The future of environmental education is secure!');
                  setTimeout(() => setCurrentScene('finalSuccess'), 4000);
                }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 rounded-lg p-4 text-white font-mono font-bold"
              >
                🎉 INITIATE FINAL REBOOT 🎉
              </motion.button>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400 font-mono">AVAILABLE MISSIONS</h3>
            <div className="space-y-3">
              {[
                { id: "quizSystem", name: "Hack Quiz Database", difficulty: "MEDIUM", points: 400, desc: "Restore corrupted environmental quiz data" },
                { id: "challengeNetwork", name: "Reboot Challenge Network", difficulty: "HIGH", points: 500, desc: "Fix broken environmental challenge system" },
                { id: "leaderboardCore", name: "Override Leaderboard Core", difficulty: "LOW", points: 250, desc: "Repair global ranking algorithms" },
                { id: "userProfiles", name: "Decrypt User Profiles", difficulty: "MEDIUM", points: 350, desc: "Unlock corrupted user achievement data" }
              ].map((mission, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                  onClick={() => setCurrentScene(mission.id)}
                  disabled={completedMissions.includes(mission.id)}
                  className={`w-full rounded-lg p-4 text-left border transition-all group ${
                    completedMissions.includes(mission.id) 
                      ? 'bg-green-800/30 border-green-500 opacity-75' 
                      : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 hover:border-cyan-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className={`font-mono text-sm transition-colors ${
                        completedMissions.includes(mission.id) 
                          ? 'text-green-300' 
                          : 'text-gray-300 group-hover:text-cyan-300'
                      }`}>
                        {completedMissions.includes(mission.id) ? '✅ ' : ''}{mission.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {mission.desc}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="text-xs text-cyan-400 font-mono">{mission.points} PTS</span>
                      <span className={`text-xs px-2 py-1 rounded font-mono ${
                        mission.difficulty === 'HIGH' ? 'bg-red-600 text-red-100' : 
                        mission.difficulty === 'MEDIUM' ? 'bg-orange-600 text-orange-100' : 'bg-green-600 text-green-100'
                      }`}>
                        {mission.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300" 
                         style={{ width: completedMissions.includes(mission.id) ? '100%' : '0%' }}>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      ),
      choices: []
    },

    quizSystem: {
      title: "QUIZ DATABASE BREACH",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="relative mb-4">
              <AcademicCapIcon className="w-20 h-20 text-blue-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-blue-400 font-mono mb-4">QUIZ SYSTEM CORRUPTED</h3>
            <CharacterAvatar character="echo" size="md" animate={true} />
          </div>
          
          <div className="bg-black/30 rounded-lg p-6 space-y-4">
            <p className="text-gray-300">
              The EcoLearn quiz database has been infected with malware. Environmental education data is scrambled. 
              You must restore the quiz categories to save student learning progress.
            </p>
            
            <div className="bg-blue-900/30 border border-blue-500 rounded p-4">
              <h4 className="text-blue-400 font-mono mb-2">CORRUPTED CATEGORIES</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-red-400">Recycling: 23% CORRUPTED</div>
                <div className="text-red-400">Energy: 45% CORRUPTED</div>
                <div className="text-orange-400">Water: 67% CORRUPTED</div>
                <div className="text-red-400">Climate: 89% CORRUPTED</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { action: "Restore Quiz Data", effect: "Fix all categories", success: 95 },
                { action: "Rebuild Database", effect: "Clean reinstall", success: 85 },
                { action: "Patch Security", effect: "Prevent future attacks", success: 90 }
              ].map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    playDialogue('echo', 'Executing data recovery protocol... Quiz database restored! Students can access their environmental education again.');
                    setPlayerStats(prev => ({ ...prev, ecoPoints: prev.ecoPoints + 400 }));
                    setCompletedMissions(prev => [...prev, 'quizSystem']);
                    setTimeout(() => setCurrentScene('quizSuccess'), 3000);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg p-4 text-center"
                >
                  <div className="text-white font-mono text-sm">
                    <div className="font-bold">{option.action}</div>
                    <div className="text-xs mt-1">{option.effect}</div>
                    <div className="text-xs text-gray-200">{option.success}% SUCCESS</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      ),
      choices: [
        { text: "RETURN TO HUB", action: () => setCurrentScene('hub'), className: "bg-gray-600 hover:bg-gray-700" }
      ]
    },

    quizSuccess: {
      title: "QUIZ SYSTEM RESTORED",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <AcademicCapIcon className="w-16 h-16 text-white" />
          </motion.div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-400 font-mono">QUIZ DATABASE ONLINE</h2>
            <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4">
              <p className="text-blue-300 font-mono text-sm">
                QUIZ SYSTEM FULLY OPERATIONAL<br/>
                ALL CATEGORIES: 100% RESTORED<br/>
                STUDENT PROGRESS: RECOVERED<br/>
                LEARNING PATHS: ACTIVE
              </p>
            </div>
            
            <p className="text-gray-300 max-w-2xl mx-auto">
              Perfect! The quiz database is clean and students can continue their environmental education. 
              Knowledge is power in the fight for our planet's future.
            </p>
            
            <div className="bg-cyan-900/30 border border-cyan-500 rounded-lg p-4">
              <p className="text-cyan-300 font-mono text-sm">
                REWARD: +400 ECO POINTS<br/>
                SKILL UPGRADE: Hacking Skill +15<br/>
                NEW TOOL UNLOCKED: Data Recovery Kit
              </p>
            </div>
          </div>
        </div>
      ),
      choices: [
        { text: "CONTINUE MISSION", action: () => setCurrentScene('hub'), className: "bg-cyan-600 hover:bg-cyan-700" },
        { text: "NEXT SYSTEM", action: () => setCurrentScene('challengeNetwork'), className: "bg-purple-600 hover:bg-purple-700" }
      ]
    },

    challengeNetwork: {
      title: "CHALLENGE NETWORK INFILTRATION",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="relative mb-4">
              <SparklesIcon className="w-20 h-20 text-pink-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-pink-400 font-mono mb-4">CHALLENGE SYSTEM COMPROMISED</h3>
            <CharacterAvatar character="echo" size="md" animate={true} />
          </div>
          
          <div className="bg-black/30 rounded-lg p-6 space-y-4">
            <p className="text-gray-300">
              The environmental challenge network is under attack! Daily challenges are failing to deploy, 
              and student engagement is dropping. You must restore the gamification engine.
            </p>
            
            <div className="bg-pink-900/30 border border-pink-500 rounded p-4">
              <h4 className="text-pink-400 font-mono mb-2">SYSTEM STATUS</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Daily Challenges:</span>
                  <span className="text-red-400 ml-2">OFFLINE</span>
                </div>
                <div>
                  <span className="text-gray-400">Point System:</span>
                  <span className="text-orange-400 ml-2">UNSTABLE</span>
                </div>
                <div>
                  <span className="text-gray-400">User Engagement:</span>
                  <span className="text-red-400 ml-2">25% DOWN</span>
                </div>
                <div>
                  <span className="text-gray-400">Streak Tracking:</span>
                  <span className="text-red-400 ml-2">BROKEN</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-cyan-400 font-mono">REPAIR PROTOCOLS</h4>
              {[
                { protocol: "Restart Challenge Engine", effect: "Restore daily challenges", success: 90 },
                { protocol: "Fix Point Calculator", effect: "Repair reward system", success: 85 },
                { protocol: "Rebuild Streak Counter", effect: "Restore user progress", success: 95 }
              ].map((protocol, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    playDialogue('echo', 'Challenge network is back online! The gamification engine is running smoothly. Students will love this!');
                    setPlayerStats(prev => ({ ...prev, ecoPoints: prev.ecoPoints + 500 }));
                    setCompletedMissions(prev => [...prev, 'challengeNetwork']);
                    setTimeout(() => setCurrentScene('challengeSuccess'), 3000);
                  }}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-lg p-4 text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-mono font-bold">{protocol.protocol}</div>
                      <div className="text-gray-300 text-sm">{protocol.effect}</div>
                    </div>
                    <div className="text-green-400 font-mono text-sm">{protocol.success}% SUCCESS</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      ),
      choices: [
        { text: "RETURN TO HUB", action: () => setCurrentScene('hub'), className: "bg-gray-600 hover:bg-gray-700" }
      ]
    },

    challengeSuccess: {
      title: "CHALLENGE NETWORK RESTORED",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="mx-auto w-32 h-32 bg-pink-500 rounded-full flex items-center justify-center"
          >
            <SparklesIcon className="w-16 h-16 text-white" />
          </motion.div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-pink-400 font-mono">CHALLENGES ONLINE</h2>
            <div className="bg-pink-900/30 border border-pink-500 rounded-lg p-4">
              <p className="text-pink-300 font-mono text-sm">
                CHALLENGE SYSTEM FULLY OPERATIONAL<br/>
                DAILY CHALLENGES: ACTIVE<br/>
                POINT REWARDS: FUNCTIONING<br/>
                USER ENGAGEMENT: RESTORED
              </p>
            </div>
            
            <p className="text-gray-300 max-w-2xl mx-auto">
              Excellent! Students can now take on environmental challenges again. 
              The gamification engine is running smoothly and motivation is at an all-time high!
            </p>
            
            <div className="bg-cyan-900/30 border border-cyan-500 rounded-lg p-4">
              <p className="text-cyan-300 font-mono text-sm">
                REWARD: +500 ECO POINTS<br/>
                SKILL UPGRADE: Environmental Knowledge +20<br/>
                NEW TOOL UNLOCKED: Challenge Generator
              </p>
            </div>
          </div>
        </div>
      ),
      choices: [
        { text: "CONTINUE MISSION", action: () => setCurrentScene('hub'), className: "bg-cyan-600 hover:bg-cyan-700" },
        { text: "NEXT SYSTEM", action: () => setCurrentScene('leaderboardCore'), className: "bg-yellow-600 hover:bg-yellow-700" }
      ]
    },

    leaderboardCore: {
      title: "LEADERBOARD CORE HACK",
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <TrophyIcon className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-yellow-400 font-mono">RANKING SYSTEM FAILURE</h3>
          </div>
          
          <div className="bg-black/30 rounded-lg p-6 space-y-4">
            <p className="text-gray-300">
              The global leaderboard has crashed! Students can't see their rankings or compete with friends. 
              The competitive spirit that drives environmental action is lost.
            </p>
            
            <div className="bg-yellow-900/30 border border-yellow-500 rounded p-4">
              <h4 className="text-yellow-400 font-mono mb-2">LEADERBOARD STATUS</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Global Rankings:</span>
                  <span className="text-red-400 ml-2">CORRUPTED</span>
                </div>
                <div>
                  <span className="text-gray-400">School Rankings:</span>
                  <span className="text-red-400 ml-2">OFFLINE</span>
                </div>
                <div>
                  <span className="text-gray-400">Achievement System:</span>
                  <span className="text-orange-400 ml-2">UNSTABLE</span>
                </div>
                <div>
                  <span className="text-gray-400">Competition Mode:</span>
                  <span className="text-red-400 ml-2">DISABLED</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-cyan-400 font-mono">RESTORATION OPTIONS</h4>
              {[
                { protocol: "Rebuild Ranking Algorithm", effect: "Restore fair competition", success: 92 },
                { protocol: "Sync Achievement Data", effect: "Recover all badges", success: 88 },
                { protocol: "Enable Real-time Updates", effect: "Live leaderboard", success: 95 }
              ].map((protocol, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    playDialogue('echo', 'Leaderboard algorithms restored! Global competition is back. Students worldwide can compete again!');
                    setPlayerStats(prev => ({ ...prev, ecoPoints: prev.ecoPoints + 250 }));
                    setCompletedMissions(prev => [...prev, 'leaderboardCore']);
                    setTimeout(() => setCurrentScene('leaderboardSuccess'), 3000);
                  }}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 rounded-lg p-4 text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-mono font-bold">{protocol.protocol}</div>
                      <div className="text-gray-300 text-sm">{protocol.effect}</div>
                    </div>
                    <div className="text-green-400 font-mono text-sm">{protocol.success}% SUCCESS</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      ),
      choices: [
        { text: "RETURN TO HUB", action: () => setCurrentScene('hub'), className: "bg-gray-600 hover:bg-gray-700" }
      ]
    },

    leaderboardSuccess: {
      title: "LEADERBOARD RESTORED",
      background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center"
          >
            <TrophyIcon className="w-16 h-16 text-white" />
          </motion.div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-yellow-400 font-mono">RANKINGS ONLINE</h2>
            <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4">
              <p className="text-yellow-300 font-mono text-sm">
                LEADERBOARD FULLY OPERATIONAL<br/>
                GLOBAL RANKINGS: ACTIVE<br/>
                ACHIEVEMENTS: SYNCHRONIZED<br/>
                COMPETITION: ENABLED
              </p>
            </div>
            
            <p className="text-gray-300 max-w-2xl mx-auto">
              Amazing! The competitive spirit is back. Students worldwide can now compete 
              in environmental challenges and see their impact on the global stage.
            </p>
            
            <div className="bg-cyan-900/30 border border-cyan-500 rounded-lg p-4">
              <p className="text-cyan-300 font-mono text-sm">
                REWARD: +250 ECO POINTS<br/>
                SKILL UPGRADE: Hacking Skill +10<br/>
                NEW TOOL UNLOCKED: Ranking Analyzer
              </p>
            </div>
          </div>
        </div>
      ),
      choices: [
        { text: "CONTINUE MISSION", action: () => setCurrentScene('hub'), className: "bg-cyan-600 hover:bg-cyan-700" },
        { text: "FINAL SYSTEM", action: () => setCurrentScene('userProfiles'), className: "bg-green-600 hover:bg-green-700" }
      ]
    },

    userProfiles: {
      title: "USER PROFILE DECRYPTION",
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <UserIcon className="w-20 h-20 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-purple-400 font-mono">USER DATA ENCRYPTED</h3>
          </div>
          
          <div className="bg-black/30 rounded-lg p-6 space-y-4">
            <p className="text-gray-300">
              Student profiles are locked behind military-grade encryption! Personal achievements, 
              eco-points, and learning progress are inaccessible. Break the encryption to restore user identities.
            </p>
            
            <div className="bg-purple-900/30 border border-purple-500 rounded p-4">
              <h4 className="text-purple-400 font-mono mb-2">ENCRYPTED DATA</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">User Profiles:</span>
                  <span className="text-red-400 ml-2">ENCRYPTED</span>
                </div>
                <div>
                  <span className="text-gray-400">Achievement Data:</span>
                  <span className="text-red-400 ml-2">LOCKED</span>
                </div>
                <div>
                  <span className="text-gray-400">Progress Tracking:</span>
                  <span className="text-orange-400 ml-2">INACCESSIBLE</span>
                </div>
                <div>
                  <span className="text-gray-400">Eco-Points:</span>
                  <span className="text-red-400 ml-2">FROZEN</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-cyan-400 font-mono">DECRYPTION METHODS</h4>
              {[
                { protocol: "Brute Force Attack", effect: "Break encryption by force", success: 78 },
                { protocol: "Social Engineering", effect: "Find security backdoor", success: 85 },
                { protocol: "Quantum Decryption", effect: "Advanced algorithm crack", success: 97 }
              ].map((protocol, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    playDialogue('echo', 'User profiles decrypted! All student achievements and progress restored. Their environmental journey continues!');
                    setPlayerStats(prev => ({ ...prev, ecoPoints: prev.ecoPoints + 350 }));
                    setCompletedMissions(prev => [...prev, 'userProfiles']);
                    setTimeout(() => setCurrentScene('profileSuccess'), 3000);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg p-4 text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-mono font-bold">{protocol.protocol}</div>
                      <div className="text-gray-300 text-sm">{protocol.effect}</div>
                    </div>
                    <div className="text-green-400 font-mono text-sm">{protocol.success}% SUCCESS</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      ),
      choices: [
        { text: "RETURN TO HUB", action: () => setCurrentScene('hub'), className: "bg-gray-600 hover:bg-gray-700" }
      ]
    },

    profileSuccess: {
      title: "USER PROFILES UNLOCKED",
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto w-32 h-32 bg-purple-500 rounded-full flex items-center justify-center"
          >
            <UserIcon className="w-16 h-16 text-white" />
          </motion.div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-purple-400 font-mono">PROFILES RESTORED</h2>
            <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-4">
              <p className="text-purple-300 font-mono text-sm">
                USER SYSTEM FULLY OPERATIONAL<br/>
                ALL PROFILES: DECRYPTED<br/>
                ACHIEVEMENTS: RESTORED<br/>
                ECO-POINTS: UNLOCKED
              </p>
            </div>
            
            <p className="text-gray-300 max-w-2xl mx-auto">
              Incredible! Every student's journey is now visible again. Their hard-earned achievements 
              and environmental impact are restored. Personal motivation is at its peak!
            </p>
            
            <div className="bg-cyan-900/30 border border-cyan-500 rounded-lg p-4">
              <p className="text-cyan-300 font-mono text-sm">
                REWARD: +350 ECO POINTS<br/>
                SKILL UPGRADE: Environmental Knowledge +25<br/>
                NEW TOOL UNLOCKED: Profile Analyzer
              </p>
            </div>
          </div>
        </div>
      ),
      choices: [
        { text: "RETURN TO HUB", action: () => setCurrentScene('hub'), className: "bg-cyan-600 hover:bg-cyan-700" }
      ]
    },

    finalSuccess: {
      title: "ECOLEARN PLATFORM RESTORED",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      content: (
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0, rotate: -360 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5 }}
            className="mx-auto w-40 h-40 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <CheckCircleIcon className="w-24 h-24 text-white" />
          </motion.div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 font-mono">
              MISSION ACCOMPLISHED
            </h2>
            
            <div className="bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 border border-green-500 rounded-lg p-6">
              <p className="text-green-300 font-mono text-lg leading-relaxed">
                🎉 ECOLEARN PLATFORM: 100% OPERATIONAL 🎉<br/>
                📚 QUIZ SYSTEM: ONLINE & SECURE<br/>
                🎯 CHALLENGES: ACTIVE & ENGAGING<br/>
                🏆 LEADERBOARDS: COMPETITIVE & FAIR<br/>
                👤 USER PROFILES: RESTORED & PROTECTED
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-xl text-gray-300">
                <strong className="text-cyan-400">Congratulations, Agent Echo!</strong>
              </p>
              <p className="text-gray-300 leading-relaxed">
                You've successfully rebooted the entire EcoLearn platform! Millions of students worldwide 
                can now continue their environmental education journey. The quiz system is secure, 
                challenges are engaging, leaderboards are competitive, and user profiles are protected.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Thanks to your elite hacking skills, the next generation will have the knowledge and 
                motivation to tackle climate change, protect biodiversity, and create a sustainable future. 
                The planet's educational infrastructure is stronger than ever!
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-pink-900/30 border border-cyan-500 rounded-lg p-6">
              <p className="text-cyan-300 font-mono text-lg">
                🎖️ FINAL REWARDS 🎖️<br/>
                TOTAL ECO POINTS EARNED: +{playerStats.ecoPoints}<br/>
                RANK ACHIEVED: LEGENDARY ENVIRONMENTAL HACKER<br/>
                SPECIAL UNLOCK: PLANET GUARDIAN STATUS<br/>
                ACHIEVEMENT: SAVIOR OF ENVIRONMENTAL EDUCATION
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="text-2xl"
            >
              🌍💚 THE FUTURE IS SECURE 💚🌍
            </motion.div>
          </div>
        </div>
      ),
      choices: [
        { text: "RETURN TO ECOLEARN", action: () => window.location.href = '/dashboard', className: "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400" },
        { text: "PLAY AGAIN", action: () => { setCurrentScene('intro'); setCompletedMissions([]); setPlayerStats({ systemIntegrity: 100, ecoPoints: 0, hackingSkill: 50, environmentalKnowledge: 50 }); }, className: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400" }
      ]
    }
  };

  const currentSceneData = scenes[currentScene] || scenes.intro;

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: currentSceneData?.background || 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)' }}
      >
        <div className="absolute inset-0 bg-black/20" />
        {/* Matrix-style falling code effect */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 font-mono text-xs"
              style={{ left: `${i * 5}%`, top: '-10%' }}
              animate={{ y: '110vh' }}
              transition={{ duration: 10 + i, repeat: Infinity, ease: 'linear' }}
            >
              {Math.random().toString(36).substring(7)}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-cyan-500/30 bg-black/50 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-cyan-400 hover:text-cyan-300">
              <HomeIcon className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-cyan-400 font-mono">REBOOT PROTOCOL</h1>
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="text-cyan-400 hover:text-cyan-300 p-1"
            >
              {audioEnabled ? <SpeakerWaveIcon className="w-5 h-5" /> : <SpeakerXMarkIcon className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="flex items-center space-x-6 text-sm font-mono">
            <div className="text-green-400">
              ECO: {playerStats.ecoPoints}
            </div>
            <div className="text-blue-400">
              SYS: {playerStats.systemIntegrity}%
            </div>
            <div className="text-purple-400">
              MISSIONS: {completedMissions.length}/4
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-cyan-400 font-mono mb-2">
                {currentSceneData?.title || 'LOADING...'}
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/30">
              {currentScene === 'intro' && (
                <div style={{width: '100%'}}>
                  <div style={{position: 'relative', paddingBottom: '56.25%', paddingTop: 0, height: 0}}>
                    <iframe 
                      title="Reboot Protocol" 
                      frameBorder="0" 
                      width="1200" 
                      height="675" 
                      style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                      src="https://view.genially.com/68c19441e841fa0ed5766975" 
                      type="text/html" 
                      allowScriptAccess="always" 
                      allowFullScreen={true} 
                      scrolling="yes" 
                      allowNetworking="all"
                    />
                  </div>
                </div>
              )}
              {currentScene !== 'intro' && (
                <>
                  {showDialogue && (
                    <CharacterDialogue 
                      character={currentCharacter}
                      dialogue={currentDialogue}
                      onComplete={hideDialogue}
                    />
                  )}
                  {currentSceneData?.content || <div className="text-center text-gray-300">Loading...</div>}
                </>
              )}
            </div>

            {/* Choices */}
            {currentSceneData?.choices?.length > 0 && (
              <div className="flex justify-center space-x-4 mt-8">
                {currentSceneData.choices.map((choice, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={choice.action}
                    className={`px-8 py-3 rounded-lg font-mono font-bold text-white transition-all ${choice.className} flex items-center space-x-2`}
                  >
                    <span>{choice.text}</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Realistic Audio */}
      <RealisticAudio scene={currentScene} isPlaying={audioEnabled} />

      {/* Terminal-style footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-cyan-500/30 p-2 z-10">
        <div className="flex items-center space-x-2 text-xs font-mono text-green-400">
          <span>$</span>
          <span className="animate-pulse">agent_echo@ecolearn:~$ {allMissionsCompleted ? 'all_systems_restored...' : 'executing_reboot_protocol...'}</span>
        </div>
      </div>
    </div>
  );
};

export default RebootProtocol;