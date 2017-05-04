var mongoose = require('mongoose'); 

var config = require('../config');

mongoose.Promise = Promise;

mongoose.connect(config.MONGODB_URI).then(
  () => {
    console.log('Connected to MongoDB'); 
  },
  (err) => { throw err; }
); 

exports.Email = require('./Email');
exports.Analysis = require('./Analysis');
