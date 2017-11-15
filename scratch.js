'use strict';
const spacetime = require('./src');
// const moment = require('moment-timezone')
// const spacetime = require('./builds/spacetime');

//june
let june = 1401660600207 //june 1, 6:10pm
var a = spacetime(june, 'America/Toronto')
var b = spacetime(june, 'America/Santiago')
var c = spacetime(june, 'America/Lima')
console.log(a.timezone())
console.log(b.timezone())
console.log(c.timezone())
// a.log()
// b.log()

// let jan = 1515368004641 //january 7th, 6:30pm
// var a2 = spacetime(jan, 'America/Toronto')
// var b2 = spacetime(jan, 'America/Santiago')
// a2.log()
// b2.log()
//
//
// //december
// a = spacetime('2014-02-19T12:00:00Z', 'UTC')
// b = a.clone().goto('America/Sao_Paulo');
// console.log(a.hour() - b.hour() + ' hours ' + a.monthName())


// console.log('\n-moment-')
// var am = moment("2014-06-01T12:00:00Z", 'UTC').format('ha z')
// var bm = moment("2014-06-01T12:00:00Z", 'America/Sao_Paulo').format('ha z')

// var me = spacetime('2014-06-01T04:30:00Z', 'Europe/London')
// var them = moment("2014-06-01", "Europe/London").hour('4').minute('30')
// console.log(me.format('time') + ' ' + me.timezone().name)
// console.log(them.format('h:mma'))

// spacetime(null, 'America/Sao_Paulo').log()
// spacetime(null, 'Europe/London').log()
