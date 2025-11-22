const express = require('express');
const router = express.Router();
const IPO = require('../models/ipo');

// create IPO
router.post('/', async (req, res) => {
  try {
    const ipo = new IPO(req.body);
    await ipo.save();
    res.status(201).json(ipo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// list IPOs (populate company)
router.get('/', async (req, res) => {
  const ipos = await IPO.find().populate('company').sort({ openDate: -1 });
  res.json(ipos);
});

// get one IPO
router.get('/:id', async (req, res) => {
  try {
    const ipo = await IPO.findById(req.params.id).populate('company');
    if (!ipo) return res.status(404).json({ error: 'not found' });
    res.json(ipo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// update IPO
router.put('/:id', async (req, res) => {
  try {
    const ipo = await IPO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ipo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// delete
router.delete('/:id', async (req, res) => {
  try {
    await IPO.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
