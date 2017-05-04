var Email = require('../../models').Email;
var queue = require('../../queue');

function createEmail(req, res){
  queue.add('sentiment-analysis', {text: req.body['stripped-text']}, function(err, sentiment){
    if(err) throw err;
    req.body.sentiment = sentiment;
    var email = new Email(req.body);

    email.save(function(err){
      if(err) throw err;
      res.json(email);
    });
  });
}

module.exports = createEmail;
