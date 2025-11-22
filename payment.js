[3;2~const Transaction = require('../models/transaction');

async function createTransaction({ applicationId, investorPAN, amount, type }) {
  const tx = await Transaction.create({
    application: applicationId,
    investorPAN,
    amount,
    type,
    status: 'SUCCESS',
    referenceId: `TX-${Date.now()}`
  });
  return tx;
}

module.exports = { createTransaction };
