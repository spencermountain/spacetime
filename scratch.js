'use strict';
// const spacetime = require('./src/index');
// let s = spacetime([2017, 2, 22, 13, 45], 'Canada/Eastern');

const Spacetime = require('./src/spacetime');
let s = new Spacetime(Date.now(), 'Canada/Pacific');

let d = s.d;
// d.log();
// d.setHours(4);
// d.log();
s.hour(5);

console.log(s.hour());

// console.log('\n' + s.format() + '\n');
// s.hour(2);
// console.log('\n' + s.format() + '\n');
