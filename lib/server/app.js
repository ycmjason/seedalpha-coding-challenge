var express = require('express');

var apiRouter = require('./routers/api');
var app = express();

app.use('/api', apiRouter);

module.exports = app;
