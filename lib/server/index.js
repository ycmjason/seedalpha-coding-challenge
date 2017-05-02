var app = require('./app');
var queue = require('./queue');
var config = require('../config');

var HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

app.listen(config.PORT, function(){
  console.log('server started, listening to ' + config.PORT + '...');
  
  setInterval(function(){
    queue.add('aggregate-analysis', null);
  }, HOUR_IN_MILLISECONDS);
});
