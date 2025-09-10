import React, { useState } from 'react';
import ARViewer from '../components/ARViewer';
import ARTreePlanting from '../components/ARTreePlanting';
import ARRecycling from '../components/ARRecycling';
import { CameraIcon, CubeIcon, AcademicCapIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ARExperience = () => {
  const [showAR, setShowAR] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');
  const [totalPointsEarned, setTotalPointsEarned] = useState(0);

  const handlePointsEarned = (points) => {
    setTotalPointsEarned(prev => prev + points);
    toast.success(`Session complete! You earned ${points} eco-points!`);
  };

  const arExperiences = [
    {
      id: 'tree-planting',
      title: 'AR Tree Planting',
      description: 'Plant virtual trees and earn 50 eco-points per tree planted',
      icon: SparklesIcon,
      color: 'from-green-500 to-green-600',
      points: '50 points per tree'
    },
    {
      id: 'recycling',
      title: 'AR Recycling Center',
      description: 'Sort recyclable items and earn points for proper disposal',
      icon: CubeIcon,
      color: 'from-blue-500 to-blue-600',
      points: '15-35 points per item'
    },
    {
      id: 'quiz',
      title: 'Quiz AR Mode',
      description: 'Experience quizzes in augmented reality with 3D visualizations',
      icon: AcademicCapIcon,
      color: 'from-purple-500 to-purple-600',
      points: 'Quiz rewards'
    }
  ];

  const handleStartAR = (contentType) => {
    setSelectedContent(contentType);
    setShowAR(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <CubeIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AR Learning Experiences
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Explore environmental concepts through Augmented Reality and earn eco-points for your actions!
        </p>
        {totalPointsEarned > 0 && (
          <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 px-6 py-3 rounded-lg inline-block">
            <span className="font-bold">Session Total: {totalPointsEarned} eco-points earned!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {arExperiences.map((experience) => (
          <div key={experience.id} className="card-interactive text-center">
            <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${experience.color} flex items-center justify-center`}>
              <experience.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {experience.title}
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {experience.description}
            </p>
            <div className="bg-emerald-50 text-emerald-800 px-3 py-2 rounded-lg text-sm font-medium mb-6">
              {experience.points}
            </div>
            <button
              onClick={() => handleStartAR(experience.id)}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <CameraIcon className="h-5 w-5" />
              <span>Start AR Experience</span>
            </button>
          </div>
        ))}
      </div>

      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            How to Use AR Features
          </h3>
          <p className="text-gray-600 mb-6">
            Follow these simple steps to start your AR learning experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Allow Camera Access</h4>
            <p className="text-sm text-gray-600">Grant permission to use your device camera for AR tracking</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Get AR Marker</h4>
            <p className="text-sm text-gray-600">Print the Hiro marker or display it on another screen</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Point Camera</h4>
            <p className="text-sm text-gray-600">Point your camera at the AR marker to activate 3D content</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">4</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Explore & Learn</h4>
            <p className="text-sm text-gray-600">Interact with 3D models and immersive learning content</p>
          </div>
        </div>
      </div>

      <div className="mt-12 card bg-gray-50">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            AR Marker Required
          </h3>
          <p className="text-gray-600 mb-6">
            You'll need the Hiro AR marker to use these features. Download and print it, or display it on another device.
          </p>
          <div className="inline-block bg-white p-4 rounded-lg border-2 border-gray-200">
            <div className="w-32 h-32 bg-black flex items-center justify-center text-white font-bold text-lg">
              HIRO
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            This is a simplified representation. Download the actual Hiro marker from AR.js documentation.
          </p>
        </div>
      </div>

      {showAR && selectedContent === 'tree-planting' && (
        <ARTreePlanting
          onClose={() => setShowAR(false)}
          onPointsEarned={handlePointsEarned}
        />
      )}
      
      {showAR && selectedContent === 'recycling' && (
        <ARRecycling
          onClose={() => setShowAR(false)}
          onPointsEarned={handlePointsEarned}
        />
      )}
      
      {showAR && selectedContent === 'quiz' && (
        <ARViewer
          content={selectedContent}
          onClose={() => setShowAR(false)}
        />
      )}
    </div>
  );
};

export default ARExperience;