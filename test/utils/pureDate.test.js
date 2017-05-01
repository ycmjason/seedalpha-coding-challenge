var assert = require('assert');

var pureDate = require('../../lib/utils/pureDate');

describe('Utils pureDate', function(){
  it('#does not change the original date', function(){
    var a = new Date();
    var control = new Date(a);

    assert.deepEqual(a, control);

    pureDate(a);

    assert.deepEqual(a, control);
  });

  it('#the returned date would have the same year/month/date', function(){
    var a = new Date();
    var b = pureDate(a);

    ['getFullYear', 'getMonth', 'getDate']
      .forEach((m) => assert.equal(b[m](), a[m]()));
  });

  it('#the returned date would have the hours/minutes/seconds/milliseconds = 0', function(){
    var a = new Date();
    var b = pureDate(a);

    ['getHours', 'getMilliseconds', 'getMinutes', 'getSeconds']
      .forEach((m) => assert.equal(b[m](), 0));
  });
});
