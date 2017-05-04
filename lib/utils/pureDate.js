function pureDate(date){
  // create a new Date object with the same year, month and date, but other attr 0
  if(!date || isNaN(date.getTime())) return undefined;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

module.exports = pureDate;
