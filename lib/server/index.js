var app = require('./app');
var queue = require('../queue');
var config = require('../config');


app.listen(config.PORT, function(){
  console.log('server started, listening to ' + config.PORT + '...');
  console.log(config);
  setInterval(function(){
    console.log(queue.queue.client.ready);
  }, 2000);
});
