'use strict';
const spacetime = require('./src/index');

// let s = spacetime([2017, 2, 22, 13, 45], 'Canada/Eastern');
let s = spacetime('February 22, 2017 15:42:00', 'Canada/Eastern');
s.log();
// s.goto('Canada/Pacific');
// s.log();
// s.goto('Canada/Eastern');
// s.log();
s.add(2, 'days');
s.log();
s.subtract(2, 'quarters');
s.log();
