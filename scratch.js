'use strict';
const spacetime = require('./src');

//bug. 1
// let d = new Date('March 11, 2017');
// let s = spacetime(d, 'Canada/Eastern');
// s.log();

let d = new Date('March 11, 2017');
// let epoch = d.getTime();
let s = spacetime(d);
console.log(s.timezone());
s.log();
