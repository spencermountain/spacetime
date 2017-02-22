'use strict';
const spacetime = require('./src/index');

let s = spacetime('February 22, 2017 3:42:00', 'Canada/Eastern');
console.log(s.hour());
