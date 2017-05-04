var Analysis = require('../../models').Analysis;
var Email = require('../../models').Email;

var pureDate = require('../../utils/pureDate');

var Wait = require('../../utils/Wait');

var ONE_HOUR = 60 * 60 * 1000;

function start(args, done){
  console.log('aggregate analysis job arrived');
  var date = pureDate(args.date) || pureDate(new Date(Date.now() - 24 * ONE_HOUR));
  var wait = Wait(24, done);
  for(let i = 0; i < 24; i++){
    findEmailsWithDateAndHour(date, i, function(err, emails){
      if(err) throw err;

      var polarities = emails.map(email => polarity(email.sentiment));
      var neg_count = polarities.filter(p => p == 'negative').length;
      var neu_count = polarities.filter(p => p == 'neutral').length;
      var pos_count = polarities.filter(p => p == 'positive').length;

      new Analysis({
        date: date,
        hour: i,
        positive: pos_count,
        neutral: neu_count,
        negative: neg_count
      }).save(wait);
    });
  }
}

function findEmailsWithDateAndHour(date, hour, cb){
  var from = new Date(date.getTime() + hour * ONE_HOUR);
  var to = new Date(date.getTime() + (hour + 1) * ONE_HOUR);
  Email.find({
    timestamp: {"$gte": from, "$lt": to}
  }, cb);
}

function polarity(sentiment){
  if(sentiment == 0) return 'neutral';
  if(sentiment > 0) return 'positive';
  if(sentiment < 0) return 'negative';
}

module.exports = start;
