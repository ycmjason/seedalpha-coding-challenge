var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema = new Schema({
  subject: {
    type: String, 
    required: true
  },
  from: {
    type: String, 
    required: true
  },
  to: {
    type: String, 
    required: true
  },
  'body-plain': {
    type: String, 
    required: true
  },
  'body-html': {
    type: String, 
    required: true
  },
  'stripped-html': {
    type: String, 
    required: true
  },
  'stripped-text': {
    type: String, 
    required: true
  }, 
  timestamp: {
    type: Date,
    required: true
  },
  sentiment: {
    type: Number
  }
});

var Email = mongoose.model('Email', emailSchema);

module.exports = Email;
