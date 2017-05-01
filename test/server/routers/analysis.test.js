process.env.NODE_ENV = 'test';

var assert = require('assert');
var request = require('supertest');

var Analysis = require('../../../lib/models').Analysis;
var app = require('../../../lib/server/app');

var pureDate = require('../../../lib/utils/pureDate');
var Wait = require('../../../lib/utils/Wait');

var analysis_api_endpoint = '/api/analysis';
describe(analysis_api_endpoint, function(){
  afterEach(function(done){
    Analysis.remove({}, function(err){
      if(err) return done(err); 
      done();
    });
  });

  it('#GET -> 200', function(done){
    request(app)
      .get(analysis_api_endpoint)
      .expect(200, done);
  });
  it('#POST/PUT/DELETE/PATCH/HEAD -> 404', function(done){
    var count = 0;
    var wait = Wait(5, done);

    request(app).post(analysis_api_endpoint).expect(404, wait);
    request(app).put(analysis_api_endpoint).expect(404, wait);
    request(app).delete(analysis_api_endpoint).expect(404, wait);
    request(app).patch(analysis_api_endpoint).expect(404, wait);
    request(app).head(analysis_api_endpoint).expect(404, wait);
  });

  it('#make sure that nondate query will return []', function(done){
    request(app)
      .get(analysis_api_endpoint)
      .expect(200)
      .expect([], done);
  });

  describe('with some fake data', function(){
    before(function(done){
      /* some fake data */
      var wait = Wait(4, done);
      new Analysis({
        date: new Date(1990, 1, 4),
        hour: 0,
        positive: 5,
        neutral: 3,
        negative: 10
      }).save(wait);

      new Analysis({
        date: new Date(1990, 1, 4, 3, 4),
        hour: 0,
        positive: 5,
        neutral: 3,
        negative: 10
      }).save(wait);

      new Analysis({
        date: new Date(1990, 1, 4, 2, 7),
        hour: 0,
        positive: 5,
        neutral: 3,
        negative: 10
      }).save(wait);
      
      new Analysis({
        date: new Date(1990, 1, 5),
        hour: 0,
        positive: 3,
        neutral: 4,
        negative: 6
      }).save(wait);
    });

  it('#Should return the right analyses', function(done){
    var assert_analysis = (actual, expect) => {
      Object.keys(expect).forEach((k) => {
          assert.deepEqual(actual[k], expect[k])
      });
    };

    request(app)
      .get(analysis_api_endpoint)
      .query({date: (new Date(1990, 1, 4, 5, 39))})
      .expect('Content-Type', /json/)
      .expect(function(res){
        assert.equal(res.body.length, 3);
      }).end(done);
  });

  });
});
