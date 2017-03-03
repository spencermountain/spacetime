'use strict';
const spacetime = require('./src');
let s;

// s = spacetime('June 22, 2017 20:01:00', 'Australia/Brisbane');
s = spacetime('February 22, 2017 10:01:00', 'Canada/Eastern');
// s = spacetime(Date.now(), 'Canada/Pacific');

// s.season('autumn');
s.log();

console.log(s.season());
