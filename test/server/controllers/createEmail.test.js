process.env.NODE_ENV = 'test';

var assert = require('assert');

var sinon = require('sinon');

var Email = require('../../../lib/models').Email;
var createEmail = require('../../../lib/server/controllers/createEmail');


describe('createEmail controller', function(){
  it('# make sure Email.create is called', function(){
    var stub = sinon.stub(Email.prototype, 'save');

    createEmail({body: {}});

    assert(stub.calledOnce);

    stub.restore();
  });
});
