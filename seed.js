const mongoose = require('mongoose');
const Company = require('./company');
const IPO = require('./ipo');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mahesh';

async function seed() {
  await mongoose.connect(MONGO_URL);
  console.log('Connected to', MONGO_URL);

  // clear
  await Company.deleteMany({});
  await IPO.deleteMany({});

  // create companies
  const c1 = new Company({ name: 'Alpha Robotics', sector: 'Technology', description: 'Robotics company' });
  const c2 = new Company({ name: 'Green Chemicals Ltd', sector: 'Chemicals', description: 'Specialty chemicals' });
  await c1.save(); await c2.save();

  // create IPOs
  const ipo1 = new IPO({
    company: c1._id,
    issueSize: 500000,
    priceBandLow: 95,
    priceBandHigh: 100,
    openDate: new Date(Date.now() + 2*24*3600*1000), // 2 days from now
    closeDate: new Date(Date.now() + 6*24*3600*1000),
    listingDate: new Date(Date.now() + 12*24*3600*1000),
    status: 'upcoming'
  });
  const ipo2 = new IPO({
    company: c2._id,
    issueSize: 800000,
    priceBandLow: 180,
    priceBandHigh: 200,
    openDate: new Date(Date.now() - 5*24*3600*1000), // already open/closed example
    closeDate: new Date(Date.now() - 1*24*3600*1000),
    listingDate: new Date(Date.now() + 3*24*3600*1000),
    status: 'closed'
  });
  await ipo1.save(); await ipo2.save();

  console.log('Seeded companies and IPOs');
  mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
