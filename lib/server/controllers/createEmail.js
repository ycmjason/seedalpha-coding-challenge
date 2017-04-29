var Email = require('../../models/Email');

function createEmail(req, res){
  var email = new Email(req.body);
  email.save(function(){
  
  });
}

module.exports = createEmail;
