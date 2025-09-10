import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import MobileNavbar from './components/MobileNavbar';
import AnimatedBackground from './components/AnimatedBackground';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Quizzes from './pages/Quizzes';
import QuizDetail from './pages/QuizDetail';
import Challenges from './pages/Challenges';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import ARExperience from './pages/ARExperience';
import InteractiveDashboard from './pages/InteractiveDashboard';
import StoryGameplay from './pages/StoryGameplay';
import RebootProtocol from './pages/RebootProtocol';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <MobileNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quizzes" 
          element={
            <ProtectedRoute>
              <Quizzes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quiz/:id" 
          element={
            <ProtectedRoute>
              <QuizDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/challenges" 
          element={
            <ProtectedRoute>
              <Challenges />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/leaderboard" 
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ar" 
          element={
            <ProtectedRoute>
              <ARExperience />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/interactive" 
          element={
            <ProtectedRoute>
              <InteractiveDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/story" 
          element={
            <ProtectedRoute>
              <StoryGameplay />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reboot-protocol" 
          element={
            <ProtectedRoute>
              <RebootProtocol />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppRoutes />
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;