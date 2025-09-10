import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Model3D from '../components/Model3D';
import axios from 'axios';
import { 
  AcademicCapIcon, 
  SparklesIcon, 
  TrophyIcon, 
  FireIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  CubeIcon,
  BookOpenIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const [show3D, setShow3D] = useState(false);
  const [modelType, setModelType] = useState('');

  const { data: stats } = useQuery('userStats', async () => {
    const res = await axios.get('/api/leaderboard/stats');
    return res.data;
  });

  const { data: dailyChallenge } = useQuery('dailyChallenge', async () => {
    const res = await axios.get('/api/challenges/daily');
    return res.data;
  });

  const quickStats = [
    {
      icon: TrophyIcon,
      label: 'Eco Points',
      value: user?.ecoPoints || 0,
      color: 'text-emerald-600'
    },
    {
      icon: ChartBarIcon,
      label: 'Level',
      value: user?.level || 1,
      color: 'text-blue-600'
    },
    {
      icon: FireIcon,
      label: 'Streak',
      value: `${user?.streak || 0} days`,
      color: 'text-orange-600'
    },
    {
      icon: AcademicCapIcon,
      label: 'Rank',
      value: `#${stats?.rank || '-'}`,
      color: 'text-purple-600'
    }
  ];

  const handle3DView = (type) => {
    try {
      setModelType(type);
      setShow3D(true);
    } catch (error) {
      console.error('Error opening 3D view:', error);
    }
  };

  const close3DView = () => {
    setShow3D(false);
    setModelType('');
  };

  return (
    <motion.div 
      className="container-responsive"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.displayName}!
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Ready to continue your environmental learning journey?
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="flex items-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mr-3`} />
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                <CalendarDaysIcon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 mr-2" />
                Daily Challenge
              </h2>
              <button
                onClick={() => handle3DView('challenge')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                <CubeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium">3D View</span>
              </button>
            </div>
            
            {dailyChallenge ? (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {dailyChallenge.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {dailyChallenge.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="badge-success">
                      {dailyChallenge.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      +{dailyChallenge.points} points
                    </span>
                  </div>
                  <Link to="/challenges" className="btn-primary">
                    Take Challenge
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No daily challenge available</p>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button
              onClick={() => handle3DView('leaderboard')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <CubeIcon className="h-4 w-4" />
              <span className="text-xs">3D</span>
            </button>
          </div>
          
          {stats?.recentActivity?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'quiz' ? 'bg-blue-500' : 'bg-emerald-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                  {activity.score && (
                    <span className="text-xs text-gray-500">
                      {activity.score}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No recent activity</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid-responsive">
          <div className="card-interactive">
            <div className="text-center">
              <AcademicCapIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Take a Quiz</h3>
              <p className="text-gray-600 mb-4">Test your environmental knowledge</p>
              <div className="flex space-x-2">
                <Link to="/quizzes" className="btn-primary flex-1">Start Quiz</Link>
                <button
                  onClick={() => handle3DView('quiz')}
                  className="btn-secondary px-3"
                >
                  <CubeIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <Link to="/challenges" className="card-interactive">
            <div className="text-center">
              <SparklesIcon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Browse Challenges</h3>
              <p className="text-gray-600">Take on environmental actions</p>
            </div>
          </Link>

          <Link to="/leaderboard" className="card-interactive">
            <div className="text-center">
              <TrophyIcon className="h-12 w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">View Leaderboard</h3>
              <p className="text-gray-600">See how you rank globally</p>
            </div>
          </Link>
          
          <Link to="/interactive" className="card-interactive bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="text-center">
              <SparklesIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Games</h3>
              <p className="text-gray-600">Play environmental adventure games</p>
              <div className="mt-3 flex justify-center space-x-2">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">New!</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Gamified</span>
              </div>
            </div>
          </Link>
          
          <Link to="/story" className="card-interactive bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
            <div className="text-center">
              <BookOpenIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Story Adventures</h3>
              <p className="text-gray-600">Immersive environmental storylines</p>
              <div className="mt-3 flex justify-center space-x-2">
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">Epic!</span>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Story</span>
              </div>
            </div>
          </Link>
          
          <Link to="/reboot-protocol" className="card-interactive bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
            <div className="text-center">
              <ComputerDesktopIcon className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Reboot Protocol</h3>
              <p className="text-gray-600">Hack Earth's systems to save the planet</p>
              <div className="mt-3 flex justify-center space-x-2">
                <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full">Cyber!</span>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Hack</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {show3D && modelType && (
        <Model3D
          type={modelType}
          onClose={close3DView}
        />
      )}
    </motion.div>
  );
};

export default Dashboard;