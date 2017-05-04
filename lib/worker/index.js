var queue = require('../queue');

queue.on('sentiment-analysis', require('./controllers/sentiment_analysis.js'));
queue.on('aggregate-analysis', require('./controllers/aggregate_analysis.js'));
