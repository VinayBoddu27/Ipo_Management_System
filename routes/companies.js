const express = require('express');
const router = express.Router();
const Company = require('../models/company');

// create company
router.post('/', async (req, res) => {
  try {
    const c = new Company(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// list companies
router.get('/', async (req, res) => {
  const companies = await Company.find().sort({ createdAt: -1 });
  res.json(companies);
});

// get single
router.get('/:id', async (req, res) => {
  try {
    const c = await Company.findById(req.params.id);
    if (!c) return res.status(404).json({ error: 'not found' });
    res.json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
