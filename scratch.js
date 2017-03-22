'use strict';
const spacetime = require('./src');

let s = spacetime(1451667600000, 'Canada/Eastern');
s.logYear();
s.add(1, 'year').logYear();
// s.endOf('year').logYear();
