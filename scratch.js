'use strict';
const spacetime = require('./src');
// const moment = require('moment-timezone')
// const spacetime = require('./builds/spacetime');
// const zones = require('./data')
// console.log(zones)


let d = spacetime({
  year: 2017,
  month: 'january',
  day: 5,
  hour: 4,
  minute: 2
})
console.log(d.format("w D MM d, h:m a"))
