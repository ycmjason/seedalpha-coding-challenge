var path = require('path');

var express = require('express');
var app = express();

var config = require('./config');
var queue = require('./queue');

app.post('/api/task', function(req, res){
  queue.addTask();
  res.end('task added\n');
});

app.listen(config.PORT, function(){
  console.log('server started, listening to ' + config.PORT + '...');
});
