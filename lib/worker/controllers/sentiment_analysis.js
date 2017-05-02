var sentiment = require('sentiment');

var queue = require('../../queue');

function start(args, done){
  done(null, sentiment(args.text).score);
}

module.exports = start;
