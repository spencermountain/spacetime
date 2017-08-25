'use strict';
const spacetime = require('./src');
// const spacetime = require('./builds/spacetime');

let s = spacetime('june 6 2017', 'Canada/Eastern');
console.log(s.season());
// s.goto('America/Argentina');
s.goto('Australia/Canberra');
console.log(s.season());

console.log(s.timezone().hemisphere);
