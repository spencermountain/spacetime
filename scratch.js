'use strict';
const spacetime = require('./src');
// const spacetime = require('./builds/spacetime');

//bug. 1
// let s = spacetime('2016-01-01T9:00:00:122Z', 'Canada/Eastern');
// console.log(s.format().iso.local);
//
// spacetime.today();

//bug 2.
// let d = new Date('March 11, 2017');
// let s = spacetime(d);
// console.log(s.timezone());
// s.log();

let a = spacetime('March 26, 1999 20:42:00', 'Canada/Eastern');
let b = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
a.log();
b.log();
console.log(a.diff(b, 'day'));
