const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const auth = require('../middleware/auth');

// Create a new campaign
router.post('/', auth, async (req, res) => {
  try {
    const campaign = new Campaign({
      ...req.body,
      creator: req.user._id
    });

    await campaign.save();
    
    // Add campaign to user's createdCampaigns
    req.user.createdCampaigns.push(campaign._id);
    await req.user.save();

    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) filters.category = req.query.category;
    if (req.query.status) filters.status = req.query.status;

    const campaigns = await Campaign.find(filters)
      .populate('creator', 'name email')
      .sort({ createdAt: -1 });

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('creator', 'name email bio')
      .populate('supporters.user', 'name');

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update campaign
router.patch('/:id', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ _id: req.params.id, creator: req.user._id });
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found or unauthorized' });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'deadline', 'image'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    updates.forEach(update => campaign[update] = req.body[update]);
    await campaign.save();

    res.json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Support/Donate to a campaign
router.post('/:id/support', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    if (campaign.status !== 'active') {
      return res.status(400).json({ error: 'Campaign is not active' });
    }

    // Add supporter to campaign
    campaign.supporters.push({
      user: req.user._id,
      amount
    });
    campaign.currentAmount += amount;

    // Update campaign status if target reached
    if (campaign.currentAmount >= campaign.targetAmount) {
      campaign.status = 'completed';
    }

    await campaign.save();

    // Add campaign to user's supported campaigns
    req.user.supportedCampaigns.push({
      campaign: campaign._id,
      amount
    });
    await req.user.save();

    res.json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add update to campaign
router.post('/:id/updates', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ _id: req.params.id, creator: req.user._id });
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found or unauthorized' });
    }

    campaign.updates.push(req.body);
    await campaign.save();

    res.json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;