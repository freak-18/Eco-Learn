import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  UserIcon, 
  PencilIcon, 
  TrophyIcon, 
  AcademicCapIcon,
  SparklesIcon,
  FireIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    school: user?.school || '',
    grade: user?.grade || ''
  });

  const { data: stats } = useQuery('userStats', async () => {
    const res = await axios.get('/api/leaderboard/stats');
    return res.data;
  });

  const updateProfileMutation = useMutation(
    async (data) => {
      const res = await axios.put('/api/users/profile', data);
      return res.data;
    },
    {
      onSuccess: (data) => {
        updateUser(data.user);
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      },
      onError: () => {
        toast.error('Failed to update profile');
      }
    }
  );

  const grades = [
    '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade',
    '11th Grade', '12th Grade', 'College', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || '',
      school: user?.school || '',
      grade: user?.grade || ''
    });
    setIsEditing(false);
  };

  const achievements = [
    { name: 'First Quiz', description: 'Completed your first quiz', earned: stats?.completedQuizzes > 0 },
    { name: 'Quiz Master', description: 'Completed 10 quizzes', earned: stats?.completedQuizzes >= 10 },
    { name: 'Challenge Accepted', description: 'Completed your first challenge', earned: stats?.completedChallenges > 0 },
    { name: 'Eco Warrior', description: 'Completed 5 challenges', earned: stats?.completedChallenges >= 5 },
    { name: 'Streak Starter', description: 'Maintained a 7-day streak', earned: user?.streak >= 7 },
    { name: 'Level Up', description: 'Reached Level 5', earned: user?.level >= 5 },
    { name: 'Point Collector', description: 'Earned 1000 eco-points', earned: user?.ecoPoints >= 1000 },
    { name: 'Top Performer', description: 'Ranked in top 100', earned: stats?.rank <= 100 }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Profile 👤
        </h1>
        <p className="text-gray-600">
          Manage your account and view your environmental impact
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-1 text-eco-600 hover:text-eco-700"
                >
                  <PencilIcon className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School
                  </label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="input-field"
                    required
                  >
                    {grades.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isLoading}
                    className="btn-primary disabled:opacity-50"
                  >
                    {updateProfileMutation.isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-eco-100 rounded-full flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-eco-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {user?.displayName}
                    </h3>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">School</label>
                    <p className="text-gray-900">{user?.school}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Grade</label>
                    <p className="text-gray-900">{user?.grade}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="card mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Achievements 🏆
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.earned
                      ? 'border-eco-200 bg-eco-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                      🏆
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        achievement.earned ? 'text-eco-700' : 'text-gray-500'
                      }`}>
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Your Stats
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrophyIcon className="h-5 w-5 text-eco-600" />
                  <span className="text-gray-700">Eco-Points</span>
                </div>
                <span className="font-bold text-eco-600">
                  {user?.ecoPoints?.toLocaleString() || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ChartBarIcon className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">Level</span>
                </div>
                <span className="font-bold text-orange-600">
                  {user?.level || 1}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FireIcon className="h-5 w-5 text-red-500" />
                  <span className="text-gray-700">Streak</span>
                </div>
                <span className="font-bold text-red-600">
                  {user?.streak || 0} days
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-600">#</span>
                  <span className="text-gray-700">Global Rank</span>
                </div>
                <span className="font-bold text-purple-600">
                  {stats?.rank || '-'}
                </span>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Activity Summary
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AcademicCapIcon className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Quizzes Completed</span>
                </div>
                <span className="font-medium text-gray-900">
                  {stats?.completedQuizzes || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Challenges Done</span>
                </div>
                <span className="font-medium text-gray-900">
                  {stats?.completedChallenges || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrophyIcon className="h-5 w-5 text-yellow-600" />
                  <span className="text-gray-700">Achievements</span>
                </div>
                <span className="font-medium text-gray-900">
                  {achievements.filter(a => a.earned).length}/{achievements.length}
                </span>
              </div>
            </div>
          </div>

          {/* Progress to Next Level */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Level Progress
            </h2>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level {user?.level || 1}</span>
                <span>Level {(user?.level || 1) + 1}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-eco-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((user?.ecoPoints || 0) % 1000) / 10}%` 
                  }}
                ></div>
              </div>
              
              <p className="text-xs text-gray-600 text-center">
                {1000 - ((user?.ecoPoints || 0) % 1000)} points to next level
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;