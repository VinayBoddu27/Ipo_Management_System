const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  ceo: { type: String, default: '' },
  isin: { type: String, index: true, sparse: true },
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);

