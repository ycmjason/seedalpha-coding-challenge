process.env.NODE_ENV = 'test';

var assert = require('assert');

var sinon = require('sinon');

var Email = require('../../../lib/models').Email;
var queue = require('../../../lib/queue');
var createEmail = require('../../../lib/server/controllers/createEmail');

/* no clue how to test this... lol
describe('aggregate analysis worker controller', function(){
  it('# ', function(){

  });
});
*/
