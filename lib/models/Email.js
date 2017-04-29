var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema = new Schema({
  subject:       String,
  from:          String,
  to:            String,
  'body-plain':    String,
  'body-html':     String,
  'stripped-html': String,
  'stripped-text': String,
  timestamp: { type: Date },
});

var Email = mongoose.model('Email', emailSchema);

module.exports = Email;
