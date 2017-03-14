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
// s = spacetime('March 1, 2017 15:01:00', 'Canada/Eastern');
// s = spacetime('July 2, 2017 5:01:00', 'Canada/Pacific');
// s = spacetime(Date.now(), 'Canada/Eastern');
// s = spacetime(Date.now(), 'Canada/Pacific');
// s = spacetime(Date.now(), 'Asia/Taipei');
// console.log(s);
// s.log();
// s.goto('Canada/Pacific');
// s.log();
// console.log(s.timezone());
// console.log(s.format());

const allMonths = function(tz) {
  s = spacetime(Date.now(), tz);
  console.log('\n' + tz + ':');
  months.forEach((m) => {
    s.month(m);
    let meta = s.timezone();
    console.log(m + ' . . ' + meta.current.isDst);
  });
};
// allMonths('Canada/Pacific');
// allMonths('Canada/Eastern');
// allMonths('Australia/Brisbane');
// allMonths('Australia/Canberra');
allMonths('Asia/Taipei');
// console.log(s.format());

// s.startOf('week').log();
// s.startOf('month').log();


// let monthStart = spacetime('March 1, 1999 00:00:00', 'Canada/Eastern');
s = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
// s.startOf('month');

s.hour(0);
// s.date(11);
// s.log();
s.date(2);
s.log();
