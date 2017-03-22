'use strict';
const spacetime = require('./src');

let s = spacetime('January 1, 2015 2:00:00', 'Canada/Eastern');
s.month(1);
s.log();
console.log(s.week());
