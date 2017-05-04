var faker = require('faker');
var fetch = require('node-fetch');
var sentiment = require('sentiment');

var Wait = require('./lib/utils/Wait');

var Email =  require('./lib/models').Email;
var Analysis =  require('./lib/models').Analysis;

const EMAIL_LENGTH = 350;
const DATE_FROM = new Date(2017, 3, 20);
const DATE_TO = new Date(2017, 4, 3);
const NUMBER_OF_EMAILS = 3000;

function randomSubString(s, length){
  var start = Math.floor(Math.random() * (s.length-length));
  var end = start + length;
  return s.substring(start, end);
}

var fetchBrown = (function(){
  var p = fetch('http://www.sls.hawaii.edu/bley-vroman/brown.txt').then(res => res.text()) ;
  return function(){ return p; };
})();

function generateFakeEmail(){
  return fetchBrown().then(brown => {
    var email = randomSubString(brown, EMAIL_LENGTH);
    return {
      subject: faker.lorem.sentence(),
      from: faker.internet.email(),
      to: faker.internet.email(),
      'body-plain': email,
      'body-html': email,
      'stripped-html': email,
      'stripped-text': email,
      'timestamp': faker.date.between(DATE_FROM, DATE_TO),
      sentiment: sentiment(email).comparative
    };
  });
}

function addFakeEmails(){
  console.log('done clearing db');
  var waitEmail = Wait(NUMBER_OF_EMAILS, addFakeAnalyses);
  for(var i = 0; i<NUMBER_OF_EMAILS; i++){
    generateFakeEmail().then(email => new Email(email).save()).then(waitEmail);
  }
}

function addFakeAnalyses(){
  console.log('done adding emails');
  var ONE_DAY = 24 * 60 * 60 * 1000;
  var number_of_days = (DATE_TO - DATE_FROM) / ONE_DAY;
  var waitAnalyses = Wait(number_of_days, finished);
  for(var i = 0; i < number_of_days; i++){
    require('./lib/worker/controllers/aggregate_analysis')({
      date: new Date(DATE_FROM.getTime() + i * ONE_DAY)
    }, waitAnalyses);
  }
}

function finished(err){
  if(err) throw err;
  console.log('done adding analyses');
  Email.find({}, (err, emails) => console.log(emails.map(e => e.timestamp).join('\n')));
  Analysis.find({}, (err, analyses) => console.log(analyses.join('\n====\n')));
}

var wait_clearDB = Wait(2, addFakeEmails);
Email.remove({}, wait_clearDB);
Analysis.remove({}, wait_clearDB);
