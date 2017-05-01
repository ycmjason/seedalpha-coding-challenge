var app = require('./app');
var config = require('../config');

app.listen(config.PORT, function(){
  console.log('server started, listening to ' + config.PORT + '...');
});
