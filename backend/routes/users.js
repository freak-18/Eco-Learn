const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { displayName, school, grade, avatar } = req.body;
    
    const user = await User.findById(req.user._id);
    if (displayName) user.displayName = displayName;
    if (school) user.school = school;
    if (grade) user.grade = grade;
    if (avatar) user.avatar = avatar;
    
    await user.save();
    
    res.json({
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        school: user.school,
        grade: user.grade,
        avatar: user.avatar,
        ecoPoints: user.ecoPoints,
        level: user.level,
        streak: user.streak
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;