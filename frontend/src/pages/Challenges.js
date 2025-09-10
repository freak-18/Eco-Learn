import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SparklesIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const Challenges = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [proofText, setProofText] = useState({});
  const { user, updateUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: challenges, isLoading } = useQuery(
    ['challenges', selectedCategory, selectedDifficulty],
    async () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedDifficulty) params.append('difficulty', selectedDifficulty);
      
      const res = await axios.get(`/api/challenges?${params}`);
      return res.data;
    }
  );

  const completeMutation = useMutation(
    async ({ challengeId, proof }) => {
      const res = await axios.post(`/api/challenges/${challengeId}/complete`, { proof });
      return res.data;
    },
    {
      onSuccess: (data) => {
        updateUser({ 
          ecoPoints: data.totalPoints, 
          level: data.newLevel,
          streak: data.streak 
        });
        toast.success(`Challenge completed! +${data.pointsEarned} points! 🎉`);
        queryClient.invalidateQueries('challenges');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to complete challenge');
      }
    }
  );

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'recycling', label: 'Recycling' },
    { value: 'energy', label: 'Energy Saving' },
    { value: 'water', label: 'Water Conservation' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'waste-reduction', label: 'Waste Reduction' },
    { value: 'gardening', label: 'Gardening' }
  ];

  const difficulties = [
    { value: '', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isCompleted = (challengeId) => {
    return user?.completedChallenges?.some(c => c.challengeId === challengeId);
  };

  const handleCompleteChallenge = (challengeId, requiresProof) => {
    const proof = requiresProof ? proofText[challengeId] || '' : '';
    
    if (requiresProof && !proof.trim()) {
      toast.error('Please provide proof of completion');
      return;
    }

    completeMutation.mutate({ challengeId, proof });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Environmental Challenges ✨
        </h1>
        <p className="text-gray-600">
          Take action for the environment and earn eco-points
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="input-field"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {challenges?.map(challenge => {
            const completed = isCompleted(challenge._id);
            
            return (
              <div key={challenge._id} className={`card ${completed ? 'bg-green-50 border-green-200' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-2">
                        {challenge.title}
                      </h3>
                      {challenge.isDaily && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Daily
                        </span>
                      )}
                      {completed && (
                        <CheckCircleIcon className="h-5 w-5 text-green-500 ml-2" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {challenge.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-sm text-gray-500 capitalize">
                    {challenge.category.replace('-', ' ')}
                  </span>
                  <div className="text-eco-600 font-medium">
                    +{challenge.points} pts
                  </div>
                </div>

                {challenge.timeLimit && (
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Complete within {challenge.timeLimit} days
                  </div>
                )}

                {challenge.instructions && challenge.instructions.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Instructions:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {challenge.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-eco-600 mr-2">•</span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {challenge.requiresProof && !completed && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proof of Completion
                    </label>
                    <textarea
                      value={proofText[challenge._id] || ''}
                      onChange={(e) => setProofText({
                        ...proofText,
                        [challenge._id]: e.target.value
                      })}
                      placeholder="Describe what you did or provide evidence..."
                      className="input-field resize-none"
                      rows={3}
                    />
                  </div>
                )}

                <button
                  onClick={() => handleCompleteChallenge(challenge._id, challenge.requiresProof)}
                  disabled={completed || completeMutation.isLoading}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    completed
                      ? 'bg-green-100 text-green-800 cursor-not-allowed'
                      : 'btn-primary disabled:opacity-50'
                  }`}
                >
                  {completed ? 'Completed ✓' : 'Mark as Complete'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {challenges?.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No challenges found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters to see more challenges
          </p>
        </div>
      )}
    </div>
  );
};

export default Challenges;