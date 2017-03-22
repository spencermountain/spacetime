'use strict';
const spacetime = require('./src');

let a = spacetime(new Date(), 'Canada/Eastern');
// console.log(a.isValid());
console.log(a.format());
