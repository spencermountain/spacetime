'use strict';
const spacetime = require('./src');

// let d = spacetime('December 31, 1999 23:59:58', 'Canada/Eastern');
//
// d.endOf('season');
// console.log(d.format().date.long);
//
// d.endOf('season');
// console.log(d.format().date.long);

// let obj = d.progress();
// console.log(obj);

let d = spacetime('January 28, 2017 20:42:00', 'Canada/Pacific');
d.startOf('season');
console.log(d.format().date.long);
