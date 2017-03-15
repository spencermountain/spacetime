'use strict';
const spacetime = require('./src');

// let a = spacetime('March 14, 2017 22:48:00', 'Africa/Algiers');
// let b = spacetime('March 14, 2017 22:48:00', 'Canada/Pacific');
let a = spacetime();
a.startOf('season');
let b = a.clone().endOf('season');
// b.endOf('year');
// a.log();
a.log();
b.log();

// console.log(b.progress());
