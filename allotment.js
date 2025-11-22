const Application = require('../models/application');

async function runAllotment(ipoId, lotsAvailable = 2) {
  const apps = await Application.find({ ipoIssue: ipoId, status: 'APPLIED' }).sort({ appliedAt: 1 });
  let allottedCount = 0;
  for (const app of apps) {
    const requestedLots = Math.ceil(app.quantity / (app.lotSize || 1)); // if lotSize not present fallback
    if (allottedCount + requestedLots <= lotsAvailable) {
      app.status = 'ALLOTTED';
      allottedCount += requestedLots;
      await app.save();
      console.log(`Allotted ${app._id} for ${app.investorPAN}`);
    } else {
      app.status = 'REFUNDED';
      await app.save();
      console.log(`Refunded ${app._id} for ${app.investorPAN}`);
    }
  }
  return { allotted: allottedCount, processed: apps.length };
}

module.exports = { runAllotment };
