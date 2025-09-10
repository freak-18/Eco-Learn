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
  XMarkIcon,
  BookOpenIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

const MobileNavbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={closeMobileMenu}>
              <Logo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'nav-link-active' : ''}`}>
                <HomeIcon className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link to="/quizzes" className={`nav-link ${isActive('/quizzes') ? 'nav-link-active' : ''}`}>
                <AcademicCapIcon className="h-4 w-4" />
                <span>Quizzes</span>
              </Link>
              <Link to="/challenges" className={`nav-link ${isActive('/challenges') ? 'nav-link-active' : ''}`}>
                <SparklesIcon className="h-4 w-4" />
                <span>Challenges</span>
              </Link>
              <Link to="/leaderboard" className={`nav-link ${isActive('/leaderboard') ? 'nav-link-active' : ''}`}>
                <TrophyIcon className="h-4 w-4" />
                <span>Leaderboard</span>
              </Link>
              <Link to="/ar" className={`nav-link ${isActive('/ar') ? 'nav-link-active' : ''}`}>
                <CubeIcon className="h-4 w-4" />
                <span>AR</span>
              </Link>
              <Link to="/interactive" className={`nav-link ${isActive('/interactive') ? 'nav-link-active' : ''}`}>
                <SparklesIcon className="h-4 w-4" />
                <span>Interactive</span>
              </Link>
              <Link to="/story" className={`nav-link ${isActive('/story') ? 'nav-link-active' : ''}`}>
                <BookOpenIcon className="h-4 w-4" />
                <span>Stories</span>
              </Link>
              <Link to="/reboot-protocol" className={`nav-link ${isActive('/reboot-protocol') ? 'nav-link-active' : ''}`}>
                <ComputerDesktopIcon className="h-4 w-4" />
                <span>Reboot</span>
              </Link>
            </div>
          )}

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-emerald-600 font-medium">{user?.ecoPoints || 0}pts</span>
                  <span className="text-blue-600 font-medium">L{user?.level || 1}</span>
                  {user?.streak > 0 && (
                    <div className="flex items-center space-x-1 text-orange-600">
                      <FireIcon className="h-3 w-3" />
                      <span className="font-medium">{user.streak}</span>
                    </div>
                  )}
                </div>
                <Link to="/profile" className="text-gray-600 hover:text-emerald-600">
                  <UserIcon className="h-5 w-5" />
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-red-600">
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-emerald-600 text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm px-4 py-2">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-emerald-600 p-2"
            >
              {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-900">{user?.displayName}</span>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">{user?.ecoPoints || 0} pts</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Level {user?.level || 1}</span>
                  </div>
                </div>
                
                <Link to="/dashboard" onClick={closeMobileMenu} className={`mobile-nav-link ${isActive('/dashboard') ? 'mobile-nav-link-active' : ''}`}>
                  <HomeIcon className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/quizzes" onClick={closeMobileMenu} className={`mobile-nav-link ${isActive('/quizzes') ? 'mobile-nav-link-active' : ''}`}>
                  <AcademicCapIcon className="h-5 w-5" />
                  <span>Quizzes</span>
                </Link>
                <Link to="/challenges" onClick={closeMobileMenu} className={`mobile-nav-link ${isActive('/challenges') ? 'mobile-nav-link-active' : ''}`}>
                  <SparklesIcon className="h-5 w-5" />
                  <span>Challenges</span>
                </Link>
                <Link to="/leaderboard" onClick={closeMobileMenu} className={`mobile-nav-link ${isActive('/leaderboard') ? 'mobile-nav-link-active' : ''}`}>
                  <TrophyIcon className="h-5 w-5" />
                  <span>Leaderboard</span>
                </Link>
                <Link to="/ar" onClick={closeMobileMenu} className={`mobile-nav-link ${isActive('/ar') ? 'mobile-nav-link-active' : ''}`}>
                  <CubeIcon className="h-5 w-5" />
                  <span>AR Experience</span>
                </Link>
                <Link to="/interactive" onClick={closeMobileMenu} className={`mobile-nav-link ${isActive('/interactive') ? 'mobile-nav-link-active' : ''}`}>
                  <SparklesIcon className="h-5 w-5" />
                  <span>Interactive Dashboard</span>
                </Link>
                <Link to="/story" onClick={closeMobileMenu} className={`mobile-nav-link ${isActive('/story') ? 'mobile-nav-link-active' : ''}`}>
                  <BookOpenIcon className="h-5 w-5" />
                  <span>Story Adventures</span>
                </Link>
                <Link to="/reboot-protocol" onClick={closeMobileMenu} className={`mobile-nav-link ${isActive('/reboot-protocol') ? 'mobile-nav-link-active' : ''}`}>
                  <ComputerDesktopIcon className="h-5 w-5" />
                  <span>Reboot Protocol</span>
                </Link>
                <Link to="/profile" onClick={closeMobileMenu} className={`mobile-nav-link ${isActive('/profile') ? 'mobile-nav-link-active' : ''}`}>
                  <UserIcon className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                
                <button onClick={() => { logout(); closeMobileMenu(); }} className="mobile-nav-link text-red-600 w-full">
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu} className="mobile-nav-link">
                  Login
                </Link>
                <Link to="/register" onClick={closeMobileMenu} className="mobile-nav-link">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;