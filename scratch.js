'use strict';
// const spacetime = require('./src');
const spacetime = require('./builds/spacetime');

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

let s = spacetime('February 22, 2017 14:42:00', 'Canada/Pacific');
// s.goto('Canada/Pacific');
// s.goto('Canada/Eastern');
s.log();


//eastern 5:37 PM
//pacific 2:37 PM
