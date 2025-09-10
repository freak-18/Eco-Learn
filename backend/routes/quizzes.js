const express = require('express');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    
    const quizzes = await Quiz.find(filter).select('-questions.correctAnswer -questions.explanation');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select('-questions.correctAnswer -questions.explanation');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit quiz answers
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    const results = quiz.questions.map((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      if (isCorrect) score++;
      
      return {
        question: question.question,
        userAnswer: answers[index],
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      };
    });

    const percentage = Math.round((score / quiz.questions.length) * 100);
    const pointsEarned = Math.round((percentage / 100) * quiz.points);

    // Update user progress
    const user = await User.findById(req.user._id);
    user.ecoPoints += pointsEarned;
    user.completedQuizzes.push({
      quizId: quiz._id,
      score: percentage,
      completedAt: new Date()
    });
    
    // Update streak and level
    const today = new Date().toDateString();
    const lastActivity = new Date(user.lastActivity).toDateString();
    
    if (today !== lastActivity) {
      user.streak = today === new Date(new Date(user.lastActivity).getTime() + 86400000).toDateString() 
        ? user.streak + 1 : 1;
      user.lastActivity = new Date();
    }
    
    user.level = Math.floor(user.ecoPoints / 1000) + 1;
    await user.save();

    res.json({
      score: percentage,
      pointsEarned,
      totalPoints: user.ecoPoints,
      results,
      newLevel: user.level,
      streak: user.streak
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;