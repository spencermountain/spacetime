'use strict';
const spacetime = require('./src');
// let s = spacetime('January 1, 2017 1:21:05', 'Canada/Eastern');
let s = spacetime();
// s.add(6, 'months');
s.startOf('year');
s.log();
