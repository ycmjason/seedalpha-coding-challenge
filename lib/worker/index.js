var queue = require('../queue');

function start(opt, done){
  console.log('Worker start at job ' + opt.i);
  setTimeout(function(){
    console.log('Worker done at job ' + opt.i);
    done();
  }, 5000);
}

queue.onNewTask(start);
