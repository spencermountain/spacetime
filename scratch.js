'use strict';
const spacetime = require('./src');
let s = spacetime('June 30, 2017 20:01:00', 'Canada/Eastern');
s.month('February');
s.log();


// console.log(s.monthName());
