const mongoose = require('mongoose');

const IPOIssueSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  openDate: { type: Date, required: true },
  closeDate: { type: Date, required: true },
  priceBand: { low: Number, high: Number },
  listingPrice: Number,
  lotSize: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('IPOIssue', IPOIssueSchema);
