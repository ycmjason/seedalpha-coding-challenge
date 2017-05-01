var express = require('express');
var router = express.Router()

var createEmail = require('../controllers/createEmail.js');

router.post('/email', createEmail);

module.exports = router;
