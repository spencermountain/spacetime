'use strict';
const spacetime = require('./src');
let s = spacetime('March 1, 2008 1:20:05', 'Canada/Pacific');
s.subtract(0, 'month');
console.log(s.format().date.long);
// d.log();
