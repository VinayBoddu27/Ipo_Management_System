[3;2~const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
  investorPAN: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['DEBIT','CREDIT','REFUND'], required: true },
  status: { type: String, enum: ['PENDING','SUCCESS','FAILED'], default: 'PENDING' },
  referenceId: String
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
