const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  investorPAN: { type: String, required: true, trim: true },
  ipoIssue: { type: mongoose.Schema.Types.ObjectId, ref: 'IPOIssue', required: true },
  quantity: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ['APPLIED','ALLOTTED','REFUNDED'], default: 'APPLIED' },
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

ApplicationSchema.index({ investorPAN: 1 });

module.exports = mongoose.model('Application', ApplicationSchema);
