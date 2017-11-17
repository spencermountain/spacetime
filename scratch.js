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

for (let i = 0; i < 15; i++) {
  var s = spacetime({
    year: 2014 + i
  }).endOf('year');
  console.log(2014 + i, s.dayOfYear());
}
