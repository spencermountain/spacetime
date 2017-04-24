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


//make a new date in a remote timezone:

var s = spacetime('2016/01/01');
console.log(s.month()); // 0
console.log(s.format('iso-short'));
