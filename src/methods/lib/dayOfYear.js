'use strict';

//days since newyears - jan 1st is 1, jan 2nd is 2...
const dayOfYear = (d) => {
  let sum = 0;
  let month = d.getMonth();
  let tmp;
  for(let i = 0; i < month; i++) {
    tmp = new Date();
    tmp.setMonth(i);
    tmp.setDate(1);
    tmp.setHours(-2);
    // console.log(i + '   ' + tmp.getDate());
    sum += tmp.getDate();
  }
  return sum + d.getDate();
};

// function leapYear(year){
//   return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
// }

module.exports = dayOfYear;
