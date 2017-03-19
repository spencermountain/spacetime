'use strict';
const spacetime = require('./src');

let s = spacetime('June 12, 2017 20:01:00', 'Australia/Brisbane'); //the 22rd
// let s = spacetime('June 29, 2017 20:01:00', 'Canada/Eastern'); //the 22rd
// console.log(s.format().full.short);

s.log();
s.month('march');
s.log();
// // console.log(s.date());
// console.log(s.format().full.short);

// let a = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
// console.log(a.date(), 28);
