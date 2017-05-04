export default function pureDate(date){
  // create a new Date object with the same year, month and date, but other attr 0
  if(isNaN(date.getTime())) return new Date(date);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

