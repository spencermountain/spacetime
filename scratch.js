'use strict';
const spacetime = require('./src');
// let s = spacetime('January 21, 2017 1:20:05', 'Canada/Eastern');
let s = spacetime(null);
s.log();

s.year();

// s.add(1, 'month');
// console.log(s.monthName());
