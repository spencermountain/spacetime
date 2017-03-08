'use strict';
const spacetime = require('./src');
let s;
const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];
// s = spacetime('June 22, 2017 20:01:00', 'Australia/Brisbane');
s = spacetime('March 2, 2017 15:01:00', 'Canada/Eastern');
// s = spacetime('February 2, 2017 5:01:00', 'Canada/Pacific');
// s = spacetime(Date.now(), 'Canada/Eastern');
// s = spacetime(Date.now(), 'Canada/Pacific');
// s = spacetime(Date.now(), 'Asia/Taipei');
// console.log(s);
s.log();
// s.goto('Canada/Pacific');
// s.log();
// console.log(s.timezone());
// console.log(s.format());

// const allMonths = function(tz) {
//   s = spacetime(Date.now(), tz);
//   console.log('\n' + tz + ':');
//   months.forEach((m) => {
//     s.month(m);
//     console.log(m + ' . . ' + s.getOffset());
//   });
// };
// allMonths('Canada/Pacific');
// allMonths('Canada/Eastern');
// allMonths('Australia/Brisbane');
// allMonths('Australia/Canberra');
