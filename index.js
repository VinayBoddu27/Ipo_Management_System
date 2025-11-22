const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mahesh';

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

// simple api ping
app.get('/api/ping', (req,res)=> res.json({ok:true}));

mongoose.connect(MONGO_URL).then(()=> {
  console.log('Mongo connected:', MONGO_URL);
  app.listen(PORT, ()=> console.log('Server:', PORT));
}).catch(err => {
  console.error('Mongo connect error', err);
});

