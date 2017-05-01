var mongoose = require('mongoose'); 

var config = require('../config');

mongoose.Promise = Promise;

mongoose.connect(config.MONGO_URL).then(
  () => {},
  (err) => { throw err; }
); 

exports.Email = require('./Email');
exports.Analysis = require('./Analysis');
