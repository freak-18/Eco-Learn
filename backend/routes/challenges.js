const express = require('express');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all challenges
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, isDaily } = req.query;
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (isDaily !== undefined) filter.isDaily = isDaily === 'true';
    
    const challenges = await Challenge.find(filter);
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get daily challenge
router.get('/daily', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dailyChallenge = await Challenge.findOne({ 
      isDaily: true, 
      isActive: true 
    });
    
    res.json(dailyChallenge);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete challenge
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const { proof } = req.body;
    const challenge = await Challenge.findById(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    const user = await User.findById(req.user._id);
    
    // Check if already completed
    const alreadyCompleted = user.completedChallenges.some(
      c => c.challengeId.toString() === challenge._id.toString()
    );
    
    if (alreadyCompleted) {
      return res.status(400).json({ message: 'Challenge already completed' });
    }

    // Add to completed challenges
    user.completedChallenges.push({
      challengeId: challenge._id,
      completedAt: new Date(),
      proof: proof || ''
    });
    
    user.ecoPoints += challenge.points;
    user.level = Math.floor(user.ecoPoints / 1000) + 1;
    
    // Update streak for daily challenges
    if (challenge.isDaily) {
      const today = new Date().toDateString();
      const lastActivity = new Date(user.lastActivity).toDateString();
      
      if (today !== lastActivity) {
        user.streak = today === new Date(new Date(user.lastActivity).getTime() + 86400000).toDateString() 
          ? user.streak + 1 : 1;
        user.lastActivity = new Date();
      }
    }
    
    await user.save();

    res.json({
      message: 'Challenge completed successfully',
      pointsEarned: challenge.points,
      totalPoints: user.ecoPoints,
      newLevel: user.level,
      streak: user.streak
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;