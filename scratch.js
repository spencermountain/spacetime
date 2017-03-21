'use strict';
const spacetime = require('./src');
let s = spacetime('January 1, 2017 1:20:05', 'Canada/Eastern');
s.log();
s.add(40, 'day');
// s.subtract(1, 'day');
s.log();
