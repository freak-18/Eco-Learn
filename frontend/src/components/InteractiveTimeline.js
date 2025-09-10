import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const InteractiveTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(0);

  const events = [
    {
      year: "1970",
      title: "First Earth Day",
      description: "20 million Americans participated in the first Earth Day, launching the modern environmental movement.",
      impact: "Led to creation of EPA and Clean Air Act",
      color: "bg-green-500"
    },
    {
      year: "1987",
      title: "Montreal Protocol",
      description: "International treaty to protect the ozone layer by phasing out ozone-depleting substances.",
      impact: "Ozone hole recovery expected by 2060",
      color: "bg-blue-500"
    },
    {
      year: "1997",
      title: "Kyoto Protocol",
      description: "First international agreement to reduce greenhouse gas emissions.",
      impact: "Set binding targets for developed countries",
      color: "bg-purple-500"
    },
    {
      year: "2015",
      title: "Paris Agreement",
      description: "Global commitment to limit warming to 1.5°C above pre-industrial levels.",
      impact: "195 countries committed to climate action",
      color: "bg-emerald-500"
    },
    {
      year: "2021",
      title: "COP26 Glasgow",
      description: "World leaders pledged to reach net-zero emissions and end deforestation.",
      impact: "New commitments on methane and coal",
      color: "bg-orange-500"
    }
  ];

  const nextEvent = () => {
    setSelectedEvent((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setSelectedEvent((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <CalendarIcon className="h-6 w-6 text-emerald-600 mr-2" />
          Environmental Timeline
        </h3>
        <div className="flex items-center space-x-2">
          <button onClick={prevEvent} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button onClick={nextEvent} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Timeline Navigation */}
      <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
        {events.map((event, index) => (
          <motion.button
            key={index}
            className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              selectedEvent === index 
                ? `${event.color} text-white shadow-lg` 
                : 'bg-white border-2 border-gray-300 text-gray-600 hover:border-emerald-300'
            }`}
            onClick={() => setSelectedEvent(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {event.year.slice(-2)}
          </motion.button>
        ))}
      </div>

      {/* Event Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedEvent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className={`inline-block px-4 py-2 ${events[selectedEvent].color} text-white rounded-full text-sm font-medium mb-4`}>
            {events[selectedEvent].year}
          </div>
          
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            {events[selectedEvent].title}
          </h4>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            {events[selectedEvent].description}
          </p>
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="text-sm font-medium text-emerald-800 mb-1">Impact</div>
            <div className="text-emerald-700">{events[selectedEvent].impact}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {events.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              selectedEvent === index ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveTimeline;