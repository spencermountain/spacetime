'use strict';
const spacetime = require('./src');
// const spacetime = require('./builds/spacetime');


let s = spacetime.now();
s.endOf('year');
console.log(s.week());
