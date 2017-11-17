'use strict';
const spacetime = require('./src');
// const moment = require('moment-timezone')
// const spacetime = require('./builds/spacetime');
// const zones = require('./data')
// console.log(zones)


//correct one
// let jan = 1580299750000
// var s = spacetime(jan, 'Africa/Abidjan')
// s.log()
// //incorrect one
// let july = 1500299750000
// var s = spacetime(july, 'Africa/Abidjan')
// s.log()


let s = spacetime('January 1, 2017 1:20:05', 'Canada/Eastern');
console.log(s.hour())
s.log()
// var s = spacetime(1509358800000, 'Europe/Madrid');//want 11:20
//WE WANT 6:20!!!
// const epoch = 1509358800000
// var s = spacetime(epoch, 'Canada/Eastern'); //want 6:20
// s.log()
// console.log(s.d.toLocaleTimeString())
// console.log(s.timezone())
// console.log(s.epoch === epoch)

// === proper bias ==
// 300  (5hrs)
// new Date().getTimezoneOffset()
