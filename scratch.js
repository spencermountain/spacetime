'use strict';
const spacetime = require('./src');

let a = spacetime('March 25 2017', 'Canada/Eastern');
let b = spacetime('March 22 2017', 'Canada/Eastern');
// console.log(a.isValid());
console.log(a.diff(b, 'day'));
