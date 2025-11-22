const mongoose = require('mongoose');
const Company = require('../backend/models/company');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/mahesh_test', { useNewUrlParser: true, useUnifiedTopology: true });
  await Company.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

test('company requires name', async () => {
  const c = new Company({});
  let err;
  try {
    await c.validate();
  } catch (e) { err = e; }
  expect(err).toBeDefined();
  expect(err.errors.name).toBeDefined();
});
