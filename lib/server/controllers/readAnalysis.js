var Analysis = require('../../models').Analysis;

var pureDate = require('../../utils/pureDate');

function readAnalysis(req, res){
  let queryDate = new Date(req.query.date);
  if(isNaN(queryDate.getTime()) || queryDate > new Date()) return res.json([]);
  Analysis.find({date: queryDate}, function(err, analyses){
    if(err) return console.error(err);
    res.json(analyses);
  });
}

module.exports = readAnalysis;
