var express = require('express');
var router = express.Router()

var createEmail = require('../controllers/createEmail.js');

router.post('/email', function(req, res){
  /* create some email in database */
  res.end('done');
});

module.exports = router;
