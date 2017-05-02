var Analysis = require('../../models').Analysis;
var Email = require('../../models').Email;

var pureDate = require('../../utils/pureDate');

var Wait = require('../../utils/Wait');

var ONE_HOUR = 60 * 60 * 1000;

function start(args, done){
  var start_of_today = pureDate(new Date());
  var wait = Wait(24, done);
  for(var i = 0; i < 24; i++){
    findEmailsWithDateAndHour(start_of_today, i, function(err, emails){
      if(err) throw err;

      var polarities = emails.map(email => polarity(email.sentiment));
      var neg_count = polarities.filter(p => p == 'negative').length;
      var neu_count = polarities.filter(p => p == 'neutral').length;
      var pos_count = polarities.filter(p => p == 'positive').length;

      new Analysis({
        date: date,
        hour: hour,
        positive: pos_count,
        neutral: neu_count,
        negative: neg_count
      }).save(wait);
    });
  }
}

function findEmailsWithDateAndHour(date, hour, cb){
  Email.find({
    timestamp: {"$gte": date, "$lt": date + hour * ONE_HOUR}
  }, cb);
}

function polarity(sentiment){
  // since the sentiment lies between -5 to 5
  // I will define the following: (just a random decision)
  //   negative: [-5, -4, -3, -2]
  //   neutral: [-1, 0, 1]
  //   positive: [2, 3, 4, 5]
  if(-5 <= sentiment && sentiment <= -2){
    return 'negative';
  }else if(2 <= sentiment && sentiment <= 5){
    return 'positive';
  }else return 'neutral';
}

module.exports = start;
