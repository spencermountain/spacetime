'use strict';
const spacetime = require('./src');
// const spacetime = require('./builds/spacetime');

// let s = spacetime('2017-04-21T23:59:59:999Z');
// let s = spacetime('2017-03-24T21:53:03.271Z');
let s = spacetime('2017-04-03T08:00:00-0700');
// let s = spacetime('2017-99-24');
s.log();

// const obj = {
//   timeZone: 'Africa/Addis_Ababa',
//   hour12: true,
//   year: 'numeric',
//   month: 'numeric',
//   day: 'numeric',
//   hour: 'numeric',
//   minute: 'numeric',
// // second: 'numeric'
// };
//
// const fmt = new Intl.DateTimeFormat('en-US', obj);
// // let d = new Date('2017-04-28T17:04:34.159Z');
// let d = new Date();
// d.setMonth(11);
// d.setMonth(2);
// // console.log(d);
// console.log(fmt.format(d));
