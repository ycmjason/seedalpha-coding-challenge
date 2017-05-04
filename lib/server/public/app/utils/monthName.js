const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
function monthName(month){
  return monthNames[month];
}

monthName.reverse = function(name){
  return monthNames.indexOf(name);
}

export default monthName;
