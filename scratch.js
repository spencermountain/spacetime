'use strict';
const spacetime = require('./src');
// const spacetime = require('./builds/spacetime');

// let s = spacetime('june 6 2017', 'Canada/Eastern');
// console.log(s.season());
// // s.goto('America/Argentina');
// s.goto('Australia/Canberra');
// console.log(s.season());
//
// console.log(s.timezone().hemisphere);

// let s = spacetime(null, 'Canada/Eastern');
// s.time('3:55');
// s.log();
// s.startOf('quarterHour');
// // s.add(1, 'quarterHour');
// // console.log(s.progress());
// s.log();
// // s.nearest('quarterHour').log();

let today = spacetime(null, 'Canada/Eastern').startOf('day')
today.add(1, 'date')
console.log(today.format('date-short'))
