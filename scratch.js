'use strict';
const spacetime = require('./src');
// let s = spacetime('January 5, 2017 23:21:05', 'Canada/Eastern');
// let s = spacetime();
// s.endOf('day');
// s.startOf('year');
// console.log(s.format().date.long + '  -  ' + s.format().time.h12);
// s.add(1, 'hour');
// console.log(s.format().date.long + '  -  ' + s.format().time.h12);
// s.log();

// let end = spacetime('March 31, 1999 23:59:59', 'Africa/Algiers');
// end.millisecond(999);

let d = spacetime('December 1, 2000 20:42:00', 'Africa/Algiers');
d.add(365, 'day');
console.log(d.format().date.long, d.leapYear());
d.add(365, 'day');
console.log(d.format().date.long, d.leapYear());
d.add(365, 'day');
console.log(d.format().date.long, d.leapYear());
d.add(365, 'day');
console.log(d.format().date.long, d.leapYear());
// console.log(end.date());
// console.log('-------');
// d.log();
console.log(d.format());
