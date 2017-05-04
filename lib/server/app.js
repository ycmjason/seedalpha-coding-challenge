var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var morgan = require('morgan');

var apiRouter = require('./routers/api');
var app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(multer().any());

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, './public')));

require('./services/aggregateAnalysis')();

module.exports = app;
