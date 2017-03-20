'use strict';
const spacetime = require('./src');
// let s = spacetime('January 21, 2017 1:20:05', 'Canada/Eastern');
// console.log(s.format().nice.long);
// s.subtract(1, 'month');
// console.log(s.format().nice.long);

let s = spacetime('December 31, 1999 13:42:42', 'Canada/Eastern');
console.log(s.format().time);
s.add(1, 'hour');
console.log(s.format().time);
