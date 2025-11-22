const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ipo: { type: mongoose.Schema.Types.ObjectId, ref: 'IPO', required: true },
  appliedShares: { type: Number, required: true },
  applicationDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' } // pending, allotted, rejected
});

module.exports = mongoose.model('Application', applicationSchema);
