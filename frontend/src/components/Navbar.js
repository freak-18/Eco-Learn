import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import { 
  HomeIcon, 
  AcademicCapIcon, 
  TrophyIcon, 
  UserIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
  FireIcon,
  CubeIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <Logo size="md" />
            </Link>
          </div>

          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30'
                    : 'text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400'
                }`}
              >
                <HomeIcon className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/quizzes"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/quizzes')
                    ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30'
                    : 'text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400'
                }`}
              >
                <AcademicCapIcon className="h-4 w-4" />
                <span>Quizzes</span>
              </Link>

              <Link
                to="/challenges"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/challenges')
                    ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30'
                    : 'text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400'
                }`}
              >
                <SparklesIcon className="h-4 w-4" />
                <span>Challenges</span>
              </Link>

              <Link
                to="/leaderboard"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/leaderboard')
                    ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30'
                    : 'text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400'
                }`}
              >
                <TrophyIcon className="h-4 w-4" />
                <span>Leaderboard</span>
              </Link>

              <Link
                to="/ar"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/ar')
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30'
                    : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                <CubeIcon className="h-4 w-4" />
                <span>AR Experience</span>
              </Link>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="text-emerald-600 font-medium">{user?.ecoPoints || 0} pts</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-blue-600 font-medium">Level {user?.level || 1}</span>
                  {user?.streak > 0 && (
                    <>
                      <span className="text-gray-400">|</span>
                      <div className="flex items-center space-x-1 text-orange-600">
                        <FireIcon className="h-4 w-4" />
                        <span className="font-medium">{user.streak}</span>
                      </div>
                    </>
                  )}
                </div>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600"
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="text-sm">{user?.displayName}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-emerald-600 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;