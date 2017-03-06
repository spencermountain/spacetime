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
// s = spacetime('March 2, 2017 20:01:00', 'Canada/Eastern');
// s = spacetime(Date.now(), 'Canada/Eastern');
s = spacetime(Date.now(), 'Canada/Pacific');

// s.dst();
months.forEach((m) => {
  s.month(m);
  console.log(m + ' . . ' + s.month() + ' - - ' + s.season() + ' - - ' + s.getOffset());
});
