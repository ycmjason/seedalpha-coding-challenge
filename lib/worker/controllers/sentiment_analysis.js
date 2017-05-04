var sentiment = require('sentiment');

function start(args, done){
  console.log('sentiment analysis job arrived');
  done(null, sentiment(args.text).comparative);
}

module.exports = start;
