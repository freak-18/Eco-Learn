import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const InteractiveInfographic = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Carbon Footprint",
      value: "4.8 tons",
      description: "Average annual CO2 emissions per person",
      color: "bg-red-500",
      details: "Transportation accounts for 29% of emissions"
    },
    {
      title: "Water Usage",
      value: "80 gallons",
      description: "Daily water consumption per person",
      color: "bg-blue-500",
      details: "Agriculture uses 70% of global freshwater"
    },
    {
      title: "Waste Generation",
      value: "4.5 lbs",
      description: "Daily waste produced per person",
      color: "bg-yellow-500",
      details: "Only 32% of waste is recycled globally"
    },
    {
      title: "Energy Consumption",
      value: "28 kWh",
      description: "Daily energy usage per household",
      color: "bg-purple-500",
      details: "Renewable energy accounts for 12% of total consumption"
    }
  ];

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Environmental Impact Dashboard</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              activeSection === index ? 'ring-2 ring-emerald-500' : ''
            }`}
            onClick={() => setActiveSection(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-12 h-12 ${section.color} rounded-lg mb-3 flex items-center justify-center`}>
              <span className="text-white font-bold text-lg">{index + 1}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{section.value}</div>
            <div className="text-sm text-gray-600">{section.title}</div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 p-6 rounded-lg"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-4 h-4 ${sections[activeSection].color} rounded-full`}></div>
            <h4 className="text-lg font-semibold text-gray-900">{sections[activeSection].title}</h4>
          </div>
          <p className="text-gray-700 mb-2">{sections[activeSection].description}</p>
          <p className="text-sm text-gray-600">{sections[activeSection].details}</p>
          
          <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium">
            <span>Learn more about reducing your impact</span>
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InteractiveInfographic;