var express = require('express');
var bodyParser = require('body-parser')

var apiRouter = require('./routers/api');
var app = express();

app.use(bodyParser.json());

app.use('/api', apiRouter);

module.exports = app;
