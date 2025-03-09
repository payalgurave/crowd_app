const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Art', 'Health', 'Education', 'Community', 'Business', 'Other']
  },
  targetAmount: {
    type: Number,
    required: true,
    min: 0
  },
  currentAmount: {
    type: Number,
    default: 0
  },
  deadline: {
    type: Date,
    required: true
  },
  image: {
    type: String
  },
  supporters: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['active', 'completed', 'expired'],
    default: 'active'
  },
  updates: [{
    title: String,
    content: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Virtual field for campaign progress percentage
campaignSchema.virtual('progress').get(function() {
  return ((this.currentAmount / this.targetAmount) * 100).toFixed(2);
});

// Virtual field for days remaining
campaignSchema.virtual('daysRemaining').get(function() {
  return Math.ceil((this.deadline - new Date()) / (1000 * 60 * 60 * 24));
});

const Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;