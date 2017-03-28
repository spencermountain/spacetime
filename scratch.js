'use strict';
const spacetime = require('./src');

//bug. 1
let s = spacetime('1998-05-30T22:01:02:003Z', 'Canada/Eastern');
console.log(s.format().full.short);
console.log(s.second());
console.log(s.millisecond());
//bug 2.
// let d = new Date('March 11, 2017');
// let s = spacetime(d);
// console.log(s.timezone());
// s.log();
