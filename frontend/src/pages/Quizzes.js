import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import ARViewer from '../components/ARViewer';
import { ClockIcon, AcademicCapIcon, PlayIcon, TrophyIcon, CubeIcon } from '@heroicons/react/24/outline';

const Quizzes = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showAR, setShowAR] = useState(false);

  const { data: quizzes, isLoading } = useQuery(
    ['quizzes', selectedCategory, selectedDifficulty],
    async () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedDifficulty) params.append('difficulty', selectedDifficulty);
      
      const res = await axios.get(`/api/quizzes?${params}`);
      return res.data;
    }
  );

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'recycling', label: 'Recycling' },
    { value: 'energy', label: 'Energy' },
    { value: 'water', label: 'Water Conservation' },
    { value: 'climate', label: 'Climate Change' },
    { value: 'biodiversity', label: 'Biodiversity' },
    { value: 'pollution', label: 'Pollution' }
  ];

  const difficulties = [
    { value: '', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'badge-success';
      case 'medium': return 'badge-warning';
      case 'hard': return 'badge-danger';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container-responsive">
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
          <AcademicCapIcon className="h-10 sm:h-12 w-10 sm:w-12 text-blue-600" />
          <button
            onClick={() => setShowAR(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            <CubeIcon className="h-4 sm:h-5 w-4 sm:w-5" />
            <span>AR Experience</span>
          </button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Environmental Quizzes</h1>
        <p className="text-base sm:text-lg text-gray-600 px-2 sm:px-4">Test your knowledge and earn eco-points with our interactive quizzes</p>
      </div>

      <div className="card mb-8 bg-blue-50 border-blue-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Find Your Perfect Quiz</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-3">Difficulty Level</label>
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

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid-responsive">
          {quizzes?.map(quiz => (
            <div key={quiz._id} className="card-interactive group">
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <AcademicCapIcon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                  </div>
                  <span className={`${getDifficultyStyle(quiz.difficulty)} px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                    {quiz.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {quiz.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {quiz.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                      <AcademicCapIcon className="h-4 w-4" />
                      <span className="font-semibold text-sm">{quiz.questions?.length || 0}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Questions</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-orange-600 mb-1">
                      <ClockIcon className="h-4 w-4" />
                      <span className="font-semibold text-sm">{quiz.timeLimit}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Minutes</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-emerald-600 mb-1">
                      <TrophyIcon className="h-4 w-4" />
                      <span className="font-semibold text-sm">{quiz.points}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Points</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/quiz/${quiz._id}`}
                className="btn-primary w-full text-center flex items-center justify-center space-x-2"
              >
                <PlayIcon className="h-5 w-5" />
                <span>Start Quiz</span>
              </Link>
            </div>
          ))}
        </div>
      )}

      {quizzes?.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <AcademicCapIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">No quizzes found</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Try adjusting your filters to discover more environmental quizzes!
          </p>
          <button
            onClick={() => {
              setSelectedCategory('');
              setSelectedDifficulty('');
            }}
            className="btn-secondary"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {showAR && (
        <ARViewer
          content="quiz"
          onClose={() => setShowAR(false)}
        />
      )}
    </div>
  );
};

export default Quizzes;