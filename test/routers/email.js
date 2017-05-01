var assert = require('assert');

var request = require('supertest');

var app = require('../../lib/server/app');

process.env.NODE_ENV = 'test';

var email_api_endpoint = '/api/email';
describe(email_api_endpoint, function(){
  it('#POST -> 200', function(){
    request(app).post(email_api_endpoint).expect(200);
  });
  it('#GET/PUT/DELETE/PATCH/HEAD -> 404', function(){
    request(app).get(email_api_endpoint).expect(404);
    request(app).put(email_api_endpoint).expect(404);
    request(app).delete(email_api_endpoint).expect(404);
    request(app).patch(email_api_endpoint).expect(404);
    request(app).head(email_api_endpoint).expect(404);
  });

  it('#Should create a record in the email database', function(done){

  });
});
