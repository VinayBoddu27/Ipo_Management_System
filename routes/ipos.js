const express = require('express');
const router = express.Router();
const IPOIssue = require('../models/ipo_issue');
const Application = require('../models/application');
const { createTransaction } = require('../services/payment');

function validPAN(pan) {
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
}

router.post('/apply', async (req, res) => {
  try {
    const { investorPAN, ipoIssue, quantity } = req.body;
    if (!validPAN(investorPAN)) return res.status(400).json({ error: 'Invalid PAN format' });
    const ipo = await IPOIssue.findById(ipoIssue);
    const now = new Date();
    if (!ipo || now < ipo.openDate || now > ipo.closeDate) {
      return res.status(400).json({ error: 'IPO not open for application' });
    }
    const app = await Application.create({ investorPAN, ipoIssue, quantity });
    // create a transaction stub (amount = listingPrice * qty * lotsize if available)
    const amount = (ipo.listingPrice || (ipo.priceBand && ipo.priceBand.low) || 0) * quantity;
    const tx = await createTransaction({ applicationId: app._id, investorPAN, amount, type: 'DEBIT' });
    return res.status(201).json({ application: app, transaction: tx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
