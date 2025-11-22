const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name:{type:String,required:true},
  sector:String,
  description:String,
  createdAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('Company', schema);

