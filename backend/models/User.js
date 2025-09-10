const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  school: { type: String, required: true },
  grade: { type: String, required: true },
  avatar: { type: String, default: '' },
  ecoPoints: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  lastActivity: { type: Date, default: Date.now },
  lastActivityDate: { type: Date },
  achievements: [{ type: String }],
  arTreesPlanted: { type: Number, default: 0 },
  arRecyclingActions: { type: Number, default: 0 },
  arEnergyActions: { type: Number, default: 0 },
  arPoints: { type: Number, default: 0 },
  completedQuizzes: [{ 
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    score: Number,
    completedAt: { type: Date, default: Date.now }
  }],
  completedChallenges: [{
    challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
    completedAt: { type: Date, default: Date.now },
    proof: String
  }]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);