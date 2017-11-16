'use strict';
const spacetime = require('./src');
// const moment = require('moment-timezone')
// const spacetime = require('./builds/spacetime');

//june
let june = 1401660600207 //june 1, 6:10pm
let jan = 1515368004641 //january 7th, 6:30pm
//
// var a = spacetime(june, 'America/Toronto')
// console.log('june', a.timezone().current)
// var a2 = spacetime(jan, 'America/Toronto')
// console.log('january', a2.timezone().current)
//
// console.log('\n')
//
// var b = spacetime(june, 'America/Santiago')
// console.log('june', b.timezone().current)
// var b2 = spacetime(jan, 'America/Santiago')
// console.log('january', b2.timezone().current)

var jul1 = spacetime(jan, 'America/Santiago')
var jul2 = spacetime(jan, 'America/Cordoba')

jul1.log()
console.log(jul1.timezone())

console.log('\n\n')

jul2.log()
console.log(jul2.timezone())
