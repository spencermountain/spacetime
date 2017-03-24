'use strict';
const spacetime = require('./src');

//bug. 1
let s = spacetime([2017, 2, 30], 'Canada/Eastern');
s.log();

//bug 2.
// let d = new Date('March 11, 2017');
// let s = spacetime(d);
// console.log(s.timezone());
// s.log();
