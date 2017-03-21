'use strict';
const spacetime = require('./src');

let d = spacetime('December 31, 1999 23:59:58', 'Canada/Eastern');
console.log(d.dayName());
let obj = d.progress();
console.log(obj);
