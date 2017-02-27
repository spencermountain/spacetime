'use strict';
// const spacetime = require('./src/index');
// let s = spacetime([2017, 2, 22, 13, 45], 'Canada/Eastern');

const Spacetime = require('./src/spacetime');
let s = new Spacetime(Date.now(), 'Canada/Pacific');

s.log();
s.hour(2);
s.log();
