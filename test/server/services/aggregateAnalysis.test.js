process.env.NODE_ENV = 'test';

var assert = require('assert');

var sinon = require('sinon');

var aggregateAnalysisService = require('../../../lib/server/services/aggregateAnalysis');
var queue = require('../../../lib/queue');

describe('server/app.js', function(){

  it('# make sure aggregate-analysis job is added to queue every hour', function(){
    var ONE_HOUR = 60 * 60 * 1000;

    queue.testMode.enter();
    var clock = sinon.useFakeTimers();

    aggregateAnalysisService();
    assert.equal(queue.testMode.jobs.length, 0);
    clock.tick(ONE_HOUR + 10);
    assert.equal(queue.testMode.jobs.length, 1);

    clock.restore();
    queue.testMode.clear();
    queue.testMode.exit();
  });

});
