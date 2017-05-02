var sentiment = require('sentiment');

function start(args, done){
  done(null, sentiment(args.text).comparative);
}

module.exports = start;
