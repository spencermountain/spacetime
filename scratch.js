'use strict';
const spacetime = require('./src');
// const moment = require('moment-timezone')
// const spacetime = require('./builds/spacetime');

// let s = spacetime(1510799750000, 'Pacific/Auckland');
// s.log()
// console.log(s.timezone())

//all should be march 13th
spacetime('2016/03/13').log()
spacetime('03/13/2016').log()
spacetime('2016/13/03').log()
spacetime('13/03/2016').log()
