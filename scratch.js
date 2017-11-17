'use strict';
const spacetime = require('./src');
// const moment = require('moment-timezone')
// const spacetime = require('./builds/spacetime');
// const zones = require('./data')
// console.log(zones)


//23:55 eastern (11pm)
//03:55 utc
//23:55 belem
// let epoch = 1520999750000
// let d1 = spacetime(epoch, 'America/Toronto');
// console.log(d1.timezone())
// // let d = new Date(epoch)
// // console.log('eastern: ', d.toLocaleTimeString())
// // console.log('utc: ', d.toUTCString())
//
// console.log('\n')
// console.log(d1.hour())

// var s = spacetime(1509358800000, 'Europe/Madrid');
// s.log()
spacetime('2012-10-28 00:00:00+01:00').goto('Europe/London')
