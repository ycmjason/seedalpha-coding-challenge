var kue = require('kue');
var config = require('./config');

function Queue(){
  this.queue = kue.createQueue({
    redis: config.REDIS_URL
  });

  this.testMode = this.queue.testMode;
}

Queue.prototype.add = function(type, args, cb){
  var job = this.queue.create(type, args);
  job.on('complete', (res) => cb(null, res));
  job.on('failed attempt', (err, doneAttempts) => cb(err, doneAttempts));
  job.on('failed', (err) => cb(err));
  job.save();
  return this;
};

Queue.prototype.on = function(type, handler){
  this.queue.process(type, (job, done) => handler(job.data, done));
  return this;
};

module.exports = new Queue();
