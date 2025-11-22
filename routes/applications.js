const express = require('express');
const router = express.Router();
const Application = require('../models/application');
const User = require('../models/user');

// apply (create application). If user not exists, create it.
router.post('/', async (req, res) => {
  try {
    let { name, email, ipoId, appliedShares } = req.body;
    if (!email || !name) return res.status(400).json({ error: 'name and email required' });
    // find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email });
      await user.save();
    }
    const application = new Application({
      user: user._id,
      ipo: ipoId,
      appliedShares
    });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// list applications
router.get('/', async (req, res) => {
  const apps = await Application.find().populate('user').populate({
    path: 'ipo',
    populate: { path: 'company' }
  }).sort({ applicationDate: -1 });
  res.json(apps);
});

module.exports = router;
