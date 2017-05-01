var express = require('express');
var router = express.Router()


router.post('/email', require('../controllers/createEmail'));
router.get('/analysis', require('../controllers/readAnalysis'));

module.exports = router;
