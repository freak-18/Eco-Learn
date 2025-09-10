const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get global leaderboard
router.get('/global', async (req, res) => {
  try {
    const users = await User.find()
      .select('displayName school ecoPoints level streak')
      .sort({ ecoPoints: -1 })
      .limit(50);
    
    res.json(users.map((user, index) => ({
      rank: index + 1,
      displayName: user.displayName,
      school: user.school,
      ecoPoints: user.ecoPoints,
      level: user.level,
      streak: user.streak
    })));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get school leaderboard
router.get('/school', auth, async (req, res) => {
  try {
    const userSchool = req.user.school;
    const users = await User.find({ school: userSchool })
      .select('displayName school ecoPoints level streak')
      .sort({ ecoPoints: -1 })
      .limit(20);
    
    res.json(users.map((user, index) => ({
      rank: index + 1,
      displayName: user.displayName,
      school: user.school,
      ecoPoints: user.ecoPoints,
      level: user.level,
      streak: user.streak,
      isCurrentUser: user._id.toString() === req.user._id.toString()
    })));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('completedQuizzes.quizId', 'title category')
      .populate('completedChallenges.challengeId', 'title category');
    
    const totalUsers = await User.countDocuments();
    const userRank = await User.countDocuments({ ecoPoints: { $gt: user.ecoPoints } }) + 1;
    
    const stats = {
      ecoPoints: user.ecoPoints,
      level: user.level,
      streak: user.streak,
      rank: userRank,
      totalUsers,
      completedQuizzes: user.completedQuizzes.length,
      completedChallenges: user.completedChallenges.length,
      achievements: user.achievements.length,
      recentActivity: [
        ...user.completedQuizzes.slice(-5).map(q => ({
          type: 'quiz',
          title: q.quizId?.title || 'Quiz',
          date: q.completedAt,
          score: q.score
        })),
        ...user.completedChallenges.slice(-5).map(c => ({
          type: 'challenge',
          title: c.challengeId?.title || 'Challenge',
          date: c.completedAt
        }))
      ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;