'use strict';
const spacetime = require('./src/index');

// let s = spacetime([2017, 2, 22, 13, 45], 'Canada/Eastern');
let s = spacetime('January 1, 2015 2:00:00', 'Canada/Eastern');
s.log();
console.log(s.week());
