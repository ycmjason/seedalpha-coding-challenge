var sentiment = require('sentiment');

function start(args, done){
  done(null, sentiment(args.text).score);
}

module.exports = start;
