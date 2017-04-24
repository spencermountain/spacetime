'use strict';
const spacetime = require('./src');
// const spacetime = require('./builds/spacetime');

//bug 1.
// let d = new Date('March 11, 2017');
// let s = spacetime(d);
// console.log(s.timezone());
// s.log();


//bug 2.
// for(let i = 0; i < 15; i++) {
//   var s = spacetime({
//     year: 2014 + i
//   }).endOf('year');
//   console.log(s.dayOfYear()); // 0
// }

let s = spacetime.now();
s.endOf('year');
console.log(s.week());
