import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { TrophyIcon, FireIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('global');
  const { user } = useAuth();

  const { data: globalLeaderboard, isLoading: globalLoading } = useQuery(
    'globalLeaderboard',
    async () => {
      const res = await axios.get('/api/leaderboard/global');
      return res.data;
    },
    { enabled: activeTab === 'global' }
  );

  const { data: schoolLeaderboard, isLoading: schoolLoading } = useQuery(
    'schoolLeaderboard',
    async () => {
      const res = await axios.get('/api/leaderboard/school');
      return res.data;
    },
    { enabled: activeTab === 'school' }
  );

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-600';
      case 2: return 'text-gray-500';
      case 3: return 'text-orange-600';
      default: return 'text-gray-700';
    }
  };

  const currentData = activeTab === 'global' ? globalLeaderboard : schoolLeaderboard;
  const isLoading = activeTab === 'global' ? globalLoading : schoolLoading;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Leaderboard 🏆
        </h1>
        <p className="text-gray-600">
          See how you rank among environmental champions
        </p>
      </div>

      {/* Tabs */}
      <div className="card mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'global'
                ? 'bg-white text-eco-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Global Rankings
          </button>
          <button
            onClick={() => setActiveTab('school')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'school'
                ? 'bg-white text-eco-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My School ({user?.school})
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {currentData?.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                  entry.isCurrentUser ? 'bg-eco-50 border-2 border-eco-200' : 'hover:bg-gray-50'
                }`}
              >
                {/* Rank */}
                <div className={`text-lg font-bold w-8 text-center ${getRankColor(entry.rank)}`}>
                  {getRankIcon(entry.rank)}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 bg-eco-100 rounded-full flex items-center justify-center">
                  <span className="text-eco-600 font-medium">
                    {entry.displayName.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-medium ${entry.isCurrentUser ? 'text-eco-700' : 'text-gray-900'}`}>
                      {entry.displayName}
                      {entry.isCurrentUser && (
                        <span className="ml-2 text-xs bg-eco-100 text-eco-700 px-2 py-1 rounded-full">
                          You
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {entry.school} • Level {entry.level}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <TrophyIcon className="h-4 w-4 text-eco-600" />
                    <span className="font-medium text-eco-600">
                      {entry.ecoPoints.toLocaleString()}
                    </span>
                  </div>
                  
                  {entry.streak > 0 && (
                    <div className="flex items-center space-x-1">
                      <FireIcon className="h-4 w-4 text-orange-500" />
                      <span className="text-orange-600 font-medium">
                        {entry.streak}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {currentData?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <TrophyIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No rankings available
            </h3>
            <p className="text-gray-600">
              {activeTab === 'school' 
                ? 'No other students from your school have joined yet'
                : 'Be the first to start earning eco-points!'
              }
            </p>
          </div>
        )}
      </div>

      {/* Personal Stats */}
      {user && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <TrophyIcon className="h-8 w-8 text-eco-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {user.ecoPoints?.toLocaleString() || 0}
            </div>
            <div className="text-sm text-gray-600">Total Eco-Points</div>
          </div>
          
          <div className="card text-center">
            <AcademicCapIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              Level {user.level || 1}
            </div>
            <div className="text-sm text-gray-600">Current Level</div>
          </div>
          
          <div className="card text-center">
            <FireIcon className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {user.streak || 0}
            </div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;