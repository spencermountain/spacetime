'use strict';

// function leapYear(year){
//   return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
// }

//
const dayOfYear = (d) => {
  let sum = 0;
  let month = d.getMonth();
  let tmp;
  for(let i = 0; i < month; i++) {
    tmp = new Date();
    tmp.setMonth(i);
    tmp.setDate(1);
    tmp.setHours(-2);
    console.log(i + '   ' + tmp.getDate());
    sum += tmp.getDate();
  }
  return sum + d.getDate();
};
module.exports = dayOfYear;

// console.log(dayOfYear(new Date()));


// tmp = new Date('April 1, 2012 2:00:00');
// for(let i = 0; i < 12; i++) {
//   //find the last day of last month
//   tmp.setMonth(i);
//   tmp.setDate(1);
//   tmp.setDate(0);
// }
