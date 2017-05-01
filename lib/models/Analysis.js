var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pureDate = require('../utils/pureDate');

var analysisSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  hour: {
    type: Number,
    required: true
  },
  positive: {
    type: Number,
    required: true
  },
  neutral: {
    type: Number,
    required: true
  },
  negative: {
    type: Number,
    required: true
  }
});

analysisSchema.pre('save', function(next){
  this.date = pureDate(this.date);
  next();
});

analysisSchema.pre('find', function(next){
  var date = this.getQuery().date;
  if(date) this.where('date').equals(pureDate(date));
  next();
});

var Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis;
