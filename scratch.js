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


let s = spacetime('March 1 2020', 'America/New_York');
s.time('4:20pm');

s.goto('America/Los_Angeles');
//Mar 1st, 1:20pm

s.subtract(1, 'days');
//Feb 29th, 1:20pm (leap-year)
