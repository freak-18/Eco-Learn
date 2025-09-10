import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  AcademicCapIcon, 
  SparklesIcon, 
  TrophyIcon, 
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: AcademicCapIcon,
      title: 'Interactive Quizzes',
      description: 'Test your environmental knowledge with engaging quizzes across multiple categories and difficulty levels.'
    },
    {
      icon: SparklesIcon,
      title: 'Environmental Challenges',
      description: 'Take on real-world environmental action challenges and make a positive impact in your community.'
    },
    {
      icon: TrophyIcon,
      title: 'Gamification & Rewards',
      description: 'Earn eco-points, unlock achievements, and climb the leaderboard while learning about sustainability.'
    },
    {
      icon: ChartBarIcon,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and performance insights.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-emerald-600">EcoLearn</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join the environmental education revolution! Learn about sustainability, 
              take on eco-challenges, and make a positive impact on our planet.
            </p>
            <div className="flex justify-center space-x-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary text-lg px-8 py-3">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn-secondary text-lg px-8 py-3">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Core Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to become an environmental champion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <feature.icon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-emerald-100">Students Learning</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-emerald-100">Environmental Challenges</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-emerald-100">Eco-Points Earned</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Environmental Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students already making a difference through education and action.
          </p>
          {!isAuthenticated && (
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Sign Up Now - It's Free!
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;