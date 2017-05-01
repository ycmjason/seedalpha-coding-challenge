process.env.NODE_ENV = 'test';

var assert = require('assert');

var sinon = require('sinon');

var Analysis = require('../../../lib/models').Analysis;
var readAnalysis = require('../../../lib/server/controllers/readAnalysis');


describe('readAnalysis controller', function(){
  it('# if date is in the future, [] is returned', function(){
    var future_date = new Date(Date.now() + 10*24*60*60*1000);

    var assert_empty_array = (arr) => {
      assert.deepEqual(arr, []);
    };

    readAnalysis({query: {date: future_date}}, {json: assert_empty_array});
  });
  
  it('# otherwise, make sure Analysis.find is called', function(){
    var passed_date = new Date(Date.now() - 10*24*60*60*1000);
    var stub = sinon.stub(Analysis, 'find');

    readAnalysis({query: {date: passed_date}}, {});

    assert(stub.calledOnce);
    assert(stub.calledWith({date: passed_date}));

    stub.restore();
  });
});
