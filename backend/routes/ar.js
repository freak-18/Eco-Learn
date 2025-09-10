const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Save AR tree planting progress
router.post('/tree-planting', auth, async (req, res) => {
  try {
    const { treesPlanted, pointsEarned } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user points and AR activity
    user.ecoPoints += pointsEarned;
    user.arTreesPlanted = (user.arTreesPlanted || 0) + treesPlanted;
    
    // Calculate new level
    const newLevel = Math.floor(user.ecoPoints / 1000) + 1;
    const leveledUp = newLevel > user.level;
    user.level = newLevel;

    // Update streak if it's a new day
    const today = new Date().toDateString();
    const lastActivity = user.lastActivityDate ? user.lastActivityDate.toDateString() : null;
    
    if (lastActivity !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActivity === yesterday.toDateString()) {
        user.streak += 1;
      } else if (lastActivity !== today) {
        user.streak = 1;
      }
      user.lastActivityDate = new Date();
    }

    await user.save();

    res.json({
      success: true,
      totalPoints: user.ecoPoints,
      newLevel: user.level,
      leveledUp,
      totalTreesPlanted: user.arTreesPlanted,
      streak: user.streak
    });
  } catch (error) {
    console.error('AR tree planting error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get AR statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      arTreesPlanted: user.arTreesPlanted || 0,
      arRecyclingActions: user.arRecyclingActions || 0,
      arEnergyActions: user.arEnergyActions || 0,
      totalArPoints: user.arPoints || 0
    });
  } catch (error) {
    console.error('AR stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save AR recycling activity
router.post('/recycling', auth, async (req, res) => {
  try {
    const { itemsRecycled, pointsEarned } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.ecoPoints += pointsEarned;
    user.arRecyclingActions = (user.arRecyclingActions || 0) + itemsRecycled;
    
    const newLevel = Math.floor(user.ecoPoints / 1000) + 1;
    user.level = newLevel;

    await user.save();

    res.json({
      success: true,
      totalPoints: user.ecoPoints,
      newLevel: user.level,
      totalRecyclingActions: user.arRecyclingActions
    });
  } catch (error) {
    console.error('AR recycling error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save AR energy conservation activity
router.post('/energy-conservation', auth, async (req, res) => {
  try {
    const { energyActions, pointsEarned } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.ecoPoints += pointsEarned;
    user.arEnergyActions = (user.arEnergyActions || 0) + energyActions;
    
    const newLevel = Math.floor(user.ecoPoints / 1000) + 1;
    user.level = newLevel;

    await user.save();

    res.json({
      success: true,
      totalPoints: user.ecoPoints,
      newLevel: user.level,
      totalEnergyActions: user.arEnergyActions
    });
  } catch (error) {
    console.error('AR energy conservation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;