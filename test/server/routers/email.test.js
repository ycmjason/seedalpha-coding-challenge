process.env.NODE_ENV = 'test';

var assert = require('assert');

var request = require('supertest');

var Email = require('../../../lib/models').Email;

var app = require('../../../lib/server/app');
var queue = require('../../../lib/queue');

var Wait = require('../../../lib/utils/Wait');

var test_email = {
  subject: 'test',
  from: 'mary@yahhho.com',
  to: 'jason@goolle.com',
  'body-plain': 'test',
  'body-html': 'test',
  'stripped-html': 'test',
  'stripped-text': 'test' + Date.now(),
  timestamp: new Date(),
};

var email_api_endpoint = '/api/email';
describe(email_api_endpoint, function(){

  before(function() {
    queue.testMode.enter(true);
    /* passthrough worker */
    queue.on('sentiment-analysis', function(args, cb){
      cb(null, 3);
    });
  });


  afterEach(function() {
    queue.testMode.clear();
  });

  after(function() {
    queue.testMode.exit()
  });

  afterEach(function(done){
    Email.remove({}, function(err){
      if(err) return done(err); 
      done();
    });
  });

  it('#POST -> 200', function(done){
    request(app)
      .post(email_api_endpoint)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(test_email))
      .expect(200, done);
  });
  it('#GET/PUT/DELETE/PATCH/HEAD -> 404', function(done){
    var wait = Wait(5, done);

    request(app).get(email_api_endpoint).expect(404, wait);
    request(app).put(email_api_endpoint).expect(404, wait);
    request(app).delete(email_api_endpoint).expect(404, wait);
    request(app).patch(email_api_endpoint).expect(404, wait);
    request(app).head(email_api_endpoint).expect(404, wait);
  });

  it('#Should add a job to the queue', function(done){
    assert.equal(queue.testMode.jobs.length, 0);
    request(app)
      .post(email_api_endpoint)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(test_email))
      .expect('Content-Type', /json/)
      .end(function(err, res){
        assert.equal(queue.testMode.jobs.length, 1);
        done();
      });
  });

  it('#Should create a record in the email database', function(done){
    var assert_email = (actual, expect) => {
      Object.keys(expect).forEach((k) => {
          assert.deepEqual(actual[k], expect[k])
      });
    };

    request(app)
      .post(email_api_endpoint)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(test_email))
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err) return done(err);
        Email.find({}, function(err, emails){
          if(err) return done(err);
          let count = emails.length;
          assert.equal(count, 1);
          assert_email(emails[0], test_email);
          done();
        });
      });
  });
});
