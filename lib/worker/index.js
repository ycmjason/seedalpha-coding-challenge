var queue = require('../queue');

queue.on('sentiment_analysis', require('./controllers/sentiment_analysis.js'));
queue.on('aggregate_analysis', require('./controllers/aggregate_analysis.js'));
