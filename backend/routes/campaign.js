const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    }
    cb(new Error('Only images and PDFs are allowed'));
  }
});

// Create a new campaign
router.post('/', auth, upload.array('files', 5), async (req, res) => {
  try {
    const campaign = new Campaign({
      ...req.body,
      createdBy: req.user._id,
      images: req.files.filter(f => /image/.test(f.mimetype)).map(f => f.path),
      documents: req.files.filter(f => f.mimetype === 'application/pdf')
        .map(f => ({ type: f.path, description: f.originalname }))
    });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all campaigns with filters
router.get('/', async (req, res) => {
  try {
    const { category, status, sort, page = 1, limit = 10 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    const sortOptions = {};
    if (sort === 'recent') sortOptions.createdAt = -1;
    if (sort === 'popular') sortOptions['donors.length'] = -1;
    if (sort === 'amount') sortOptions.raisedAmount = -1;

    const campaigns = await Campaign.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'name email');

    const total = await Campaign.countDocuments(query);

    res.json({
      campaigns,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('donors.user', 'name');
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add donation to campaign
router.post('/:id/donate', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const donation = {
      user: req.user._id,
      amount: req.body.amount,
      message: req.body.message,
      isAnonymous: req.body.isAnonymous
    };

    campaign.donors.push(donation);
    campaign.raisedAmount += req.body.amount;
    await campaign.save();

    res.json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add update to campaign
router.post('/:id/updates', auth, upload.array('media', 3), async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found or unauthorized' });
    }

    const update = {
      title: req.body.title,
      content: req.body.content,
      media: req.files.map(f => f.path)
    };

    campaign.updates.push(update);
    await campaign.save();

    res.json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update campaign social shares
router.post('/:id/share', async (req, res) => {
  try {
    const { platform } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    campaign.socialShares[platform] += 1;
    await campaign.save();

    res.json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;