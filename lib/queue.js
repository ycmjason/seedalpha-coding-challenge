var kue = require('kue');
var config = require('./config');

function Queue(){
  this.queue = kue.createQueue({
    redis: config.REDIS_URL
  });
}

Queue.prototype.addTask = (function(){
  var c = 0;
  return function(){
    this.queue.create('task', {
      i: c++
    }).save();
  };
})();

Queue.prototype.onNewTask = function(handler){
  this.queue.process('task', function(job, done){
    handler(job.data, done);
  });
};

module.exports = new Queue();
