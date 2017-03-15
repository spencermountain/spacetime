'use strict';
const spacetime = require('./src');
let s;

s = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');

s.startOf('week').log();
