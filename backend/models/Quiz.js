const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String }
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['recycling', 'energy', 'water', 'climate', 'biodiversity', 'pollution']
  },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  timeLimit: { type: Number, required: true }, // in minutes
  questions: [questionSchema],
  points: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);