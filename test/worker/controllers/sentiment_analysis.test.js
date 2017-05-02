process.env.NODE_ENV = 'test';

var assert = require('assert');

var sinon = require('sinon');

var sentiment_analysis = require('../../../lib/worker/controllers/sentiment_analysis');


describe('sentiment analysis worker controller', function(){
  it('# make sure the score is returned to done()', function(){
    sentiment_analysis({text: 'lekjf wlkejf lkj wef'}, function(err, res){
      if(err) throw err;
      assert(Number.isFinite(res));
    });
  });

  it('# positive sentence should have positive score', function(){
    sentiment_analysis({text: 'I am really glad to see you. Today is a good day.'}, function(err, res){
      if(err) throw err;
      assert(res > 0);
    });
  });

  it('# negative sentence should have negatieve score', function(){
    sentiment_analysis({text: 'I am really sad. Today is a bad day.'}, function(err, res){
      if(err) throw err;
      assert(res < 0);
    });
  });
});
