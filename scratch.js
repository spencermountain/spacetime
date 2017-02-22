'use strict';
const spacetime = require('./src/index');

// let s = spacetime('February 22, 2017 3:42:00', 'Canada/Eastern');
let s = spacetime([2017, 2, 22], 'Canada/Eastern');
s.day('fri');
s.log();
