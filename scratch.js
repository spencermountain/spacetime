'use strict';
const spacetime = require('./src');
// let s = spacetime('June 30, 2017 20:01:00', 'Australia/Brisbane');
// let s = spacetime('january 30, 2017 20:01:00', 'Canada/Eastern');
let s = spacetime();
s.month('July');
s.date(30);
// s.month('February');
// s.log();
// console.log(s.monthName());

s.time('5:59am');
console.log(s.time());
