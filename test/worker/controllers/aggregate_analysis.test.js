process.env.NODE_ENV = 'test';

var assert = require('assert');

var sinon = require('sinon');
var sentiment = require('sentiment');

var aggregateAnalysis = require('../../../lib/worker/controllers/aggregate_analysis');
var queue = require('../../../lib/queue');
var Email = require('../../../lib/models').Email;
var Analysis = require('../../../lib/models').Analysis;
var Wait = require('../../../lib/utils/Wait');

var sentances = [
  'I am happy',
  'I am brilliant',
  'This is quite good',
  'happy birthday!',

  'this is toatally ok.',
  'neutral',
  'hi',

  'I am sad',
  'I hate you',
  'fuck you',
];

var dummy_emails = sentances.map((sentance, i) => ({
    subject: 'some subject',
    'from': 'some email',
    to: 'some email 2',
    'body-plain': sentance,
    'body-html': sentance,
    'stripped-html': sentance,
    'stripped-text': sentance,
    timestamp: new Date(i * 15 * 60 * 1000),
    sentiment: sentiment(sentance).comparative
}));

describe('aggregate analysis worker controller', function(){
  var clock;

  beforeEach(function(next){
    /* create some fake emails */
    clock = sinon.useFakeTimers();
    var wait = Wait(10, next);
    dummy_emails.forEach(e => {
      new Email(e).save(wait);
    });
  });

  afterEach(function(next){
    Email.remove({}, next);
    clock.restore();
  });

  it('# make sure analysis is done correctly', function(done){
    var ONE_HOUR = 60 * 60 * 1000;

    clock.tick(24 * ONE_HOUR);

    aggregateAnalysis(null, () => {
      Analysis.find({}, function(err, res){
        if(err) throw err;
        var first_hour_analysis = res.filter(a => a.hour==0)[0];
        assert.equal(first_hour_analysis.positive, 4);
        done();
      });
    });

  });

});
