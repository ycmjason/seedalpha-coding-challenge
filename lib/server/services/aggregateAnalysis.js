var queue = require('../../queue');

module.exports = () => {
  var ONE_HOUR = 60 * 60 * 1000;
  setInterval(function(){
    queue.add('aggregate-analysis', null);
  }, 24 * ONE_HOUR);
}
