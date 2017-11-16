'use strict';
const spacetime = require('./src');
// const moment = require('moment-timezone')
// const spacetime = require('./builds/spacetime');

let s = spacetime(1510799750000, 'Pacific/Auckland');
s.log()
console.log(s.timezone())
