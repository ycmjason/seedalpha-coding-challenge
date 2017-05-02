process.env.NODE_ENV = 'test';

var assert = require('assert');

var sinon = require('sinon');

var Email = require('../../../lib/models').Email;
var queue = require('../../../lib/queue');
var createEmail = require('../../../lib/server/controllers/createEmail');


describe('createEmail controller', function(){
  var email_save_stub;
  var queue_add_stub;
  beforeEach(function(){
    email_save_stub = sinon.stub(Email.prototype, 'save');
    queue_add_stub = sinon.stub(queue, 'add');
  });

  afterEach(function(){
    email_save_stub.restore();
    queue_add_stub.restore();
  });

  it('# make sure Email.create is called', function(){
    queue_add_stub.callsFake((type, args, cb) => cb());
    createEmail({body: {}});
    assert(email_save_stub.calledOnce);
  });

  it('# make sure queue.add is called and with arg {text: ...}', function(){
    var text = 'this is some text... blah';
    createEmail({
      body: {
        'stripped-text': text
      }
    });
    assert(queue_add_stub.calledOnce);
    assert(queue_add_stub.calledWith('sentiment-analysis', {
      'text': text 
    }));
  });
});
