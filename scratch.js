'use strict';
const spacetime = require('./src');

//bug. 1
let s = spacetime('2016-01-01T9:00:00:122Z', 'Canada/Eastern');
console.log(s.format().iso.local);

spacetime.today();

//bug 2.
// let d = new Date('March 11, 2017');
// let s = spacetime(d);
// console.log(s.timezone());
// s.log();
