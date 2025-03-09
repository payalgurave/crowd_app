const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Campaign = require('../models/Campaign');
const User = require('../models/User');

// Create a campaign
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, goal, deadline, image } = req.body;
    const campaign = new Campaign({
      title,
      description,
      category,
      goal,
      deadline,
      image,
      creator: req.user.id
    });

    await campaign.save();

    // Update user's createdCampaigns
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { createdCampaigns: campaign._id } }
    );

    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all campaigns with filters
router.get('/', async (req, res) => {
  try {
    const { category, status, sort, search } = req.query;
    let query = {};

    // Apply filters
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let campaigns = Campaign.find(query).populate('creator', 'name');

    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'newest':
          campaigns = campaigns.sort('-createdAt');
          break;
        case 'mostFunded':
          campaigns = campaigns.sort('-currentAmount');
          break;
        case 'endingSoon':
          campaigns = campaigns.sort('deadline');
          break;
      }
    }

    const results = await campaigns.exec();
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('backers.user', 'name');

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Increment page views
    campaign.analytics.pageViews += 1;
    await campaign.save();

    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update campaign
router.put('/:id', auth, async (req, res) => {
  try {
    let campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Verify campaign owner
    if (campaign.creator.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add campaign update
router.post('/:id/updates', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    if (campaign.creator.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { title, content } = req.body;
    campaign.updates.unshift({ title, content });
    await campaign.save();

    res.json(campaign.updates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add comment to campaign
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const { content } = req.body;
    campaign.comments.unshift({
      user: req.user.id,
      content
    });

    await campaign.save();

    res.json(campaign.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Support campaign (make payment)
router.post('/:id/support', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    const { amount } = req.body;

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    if (campaign.status !== 'Active') {
      return res.status(400).json({ message: 'Campaign is not active' });
    }

    // Update campaign
    campaign.currentAmount += amount;
    campaign.backers.push({
      user: req.user.id,
      amount
    });

    // Update analytics
    const totalBackers = campaign.backers.length;
    campaign.analytics.averageDonation = campaign.currentAmount / totalBackers;
    campaign.analytics.conversionRate = (totalBackers / campaign.analytics.pageViews) * 100;

    await campaign.save();

    // Update user's backed campaigns
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          backedCampaigns: {
            campaign: campaign._id,
            amount
          }
        }
      }
    );

    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;