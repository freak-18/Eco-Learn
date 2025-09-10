const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['recycling', 'energy', 'water', 'transportation', 'waste-reduction', 'gardening']
  },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  points: { type: Number, required: true },
  timeLimit: { type: Number }, // in days
  requiresProof: { type: Boolean, default: false },
  isDaily: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  instructions: [{ type: String }],
  tips: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);