const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  company:{type:mongoose.Schema.Types.ObjectId, ref:'Company', required:true},
  issueSize:Number,
  priceBandLow:Number,
  priceBandHigh:Number,
  openDate:Date,
  closeDate:Date,
  status:{type:String,default:'upcoming'}
});
module.exports = mongoose.model('IPO', schema);

