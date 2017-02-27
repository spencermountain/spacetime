'use strict';
// const spacetime = require('./src/index');
// let s = spacetime([2017, 2, 22, 13, 45], 'Canada/Eastern');

const Spacetime = require('./src/spacetime');
let s = new Spacetime(Date.now(), 'Canada/Eastern');
s.log();
s.hour(20);
s.log();
s.goto('Canada/Pacific');
s.log();
s.hour(13);
s.log();
