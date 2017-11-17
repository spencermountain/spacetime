'use strict';
const spacetime = require('./src');
// const moment = require('moment-timezone')
// const spacetime = require('./builds/spacetime');
// const zones = require('./data')
// console.log(zones)


//incorrect one
let obj = {}
for (let i = 0; i < 15; i++) {
  var s = spacetime({
    year: 2014 + i
  }).endOf('year');
  console.log(2014 + i, s.dayOfYear());
}

console.log(obj)
