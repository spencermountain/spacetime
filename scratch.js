'use strict';
// const spacetime = require('./src/index');
// let s = spacetime([2017, 2, 22, 13, 45], 'Canada/Eastern');

const Spacetime = require('./src/spacetime');
let s = new Spacetime(Date.now(), 'Canada/Eastern');
console.log('\n' + s.format() + '\n');
// s.goto('Canada/Eastern');
s.hour(2);
console.log('\n' + s.format() + '\n');
