import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeAltIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const InteractiveMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    {
      id: 'arctic',
      name: 'Arctic',
      position: { top: '10%', left: '50%' },
      issue: 'Ice Melting',
      severity: 'critical',
      description: 'Arctic sea ice is declining at 13% per decade',
      solutions: ['Reduce emissions', 'Protect polar bears', 'Support renewable energy'],
      color: 'bg-red-500'
    },
    {
      id: 'amazon',
      name: 'Amazon Rainforest',
      position: { top: '60%', left: '25%' },
      issue: 'Deforestation',
      severity: 'high',
      description: 'Lost 17% of original forest area',
      solutions: ['Stop illegal logging', 'Support indigenous rights', 'Sustainable agriculture'],
      color: 'bg-orange-500'
    },
    {
      id: 'sahara',
      name: 'Sahara Desert',
      position: { top: '45%', left: '55%' },
      issue: 'Desertification',
      severity: 'medium',
      description: 'Expanding at 48km per year southward',
      solutions: ['Reforestation', 'Water conservation', 'Sustainable farming'],
      color: 'bg-yellow-500'
    },
    {
      id: 'coral',
      name: 'Great Barrier Reef',
      position: { top: '70%', left: '85%' },
      issue: 'Coral Bleaching',
      severity: 'critical',
      description: '50% of coral lost since 1990s',
      solutions: ['Reduce water pollution', 'Control tourism', 'Climate action'],
      color: 'bg-red-500'
    },
    {
      id: 'himalayas',
      name: 'Himalayas',
      position: { top: '35%', left: '75%' },
      issue: 'Glacier Retreat',
      severity: 'high',
      description: 'Glaciers retreating at accelerating rate',
      solutions: ['Reduce black carbon', 'Climate mitigation', 'Water management'],
      color: 'bg-orange-500'
    }
  ];

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'critical': return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
      case 'high': return <ExclamationTriangleIcon className="h-5 w-5 text-orange-600" />;
      default: return <CheckCircleIcon className="h-5 w-5 text-yellow-600" />;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <GlobeAltIcon className="h-6 w-6 text-emerald-600 mr-2" />
          Global Environmental Issues
        </h3>
        <div className="text-sm text-gray-600">
          Click on hotspots to learn more
        </div>
      </div>

      <div className="relative">
        {/* World Map Background */}
        <div className="relative w-full h-96 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg overflow-hidden">
          {/* Simplified world map representation */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
            {/* Continents as simple shapes */}
            <path d="M50 80 Q80 60 120 80 L140 120 Q100 140 60 120 Z" fill="#22c55e" opacity="0.6" />
            <path d="M160 60 Q200 40 250 60 L280 100 Q240 120 180 100 Z" fill="#22c55e" opacity="0.6" />
            <path d="M300 80 Q340 70 380 90 L370 130 Q330 140 310 120 Z" fill="#22c55e" opacity="0.6" />
            <path d="M80 140 Q120 130 160 140 L180 170 Q140 180 100 170 Z" fill="#22c55e" opacity="0.6" />
          </svg>

          {/* Interactive Hotspots */}
          {regions.map((region) => (
            <motion.button
              key={region.id}
              className={`absolute w-6 h-6 ${region.color} rounded-full border-2 border-white shadow-lg cursor-pointer z-10`}
              style={region.position}
              onClick={() => setSelectedRegion(region)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: selectedRegion?.id === region.id ? 1.3 : 1,
                boxShadow: selectedRegion?.id === region.id ? '0 0 20px rgba(239, 68, 68, 0.6)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                {region.name}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Region Details */}
        <AnimatePresence>
          {selectedRegion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-6 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 ${selectedRegion.color} rounded-full`}></div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedRegion.name}</h4>
                  {getSeverityIcon(selectedRegion.severity)}
                </div>
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Issue: {selectedRegion.issue}</h5>
                  <p className="text-gray-700 text-sm mb-4">{selectedRegion.description}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Solutions</h5>
                  <ul className="space-y-2">
                    {selectedRegion.solutions.map((solution, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <CheckCircleIcon className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="btn-primary text-sm px-4 py-2">
                  Learn More
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Critical</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-gray-600">High Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-600">Medium Risk</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;