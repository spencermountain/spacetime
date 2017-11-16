'use strict';
const spacetime = require('./src');
// const moment = require('moment-timezone')
// const spacetime = require('./builds/spacetime');
// const zones = require('./data')
// console.log(zones)
// let s = spacetime('01/01/2017', 'Canada/Eastern');
// console.log('winter-', s.timezone().current.offset)
// s = spacetime('16/07/2017', 'Canada/Eastern');
// console.log('summer- ', s.timezone().current.offset)
//
console.log('\n')
let s = spacetime('01/01/2017', 'America/Santiago');
console.log('winter-', s.timezone().current.offset)
s = spacetime('16/07/2017', 'America/Santiago');
console.log('summer- ', s.timezone().current.offset)

// let s = spacetime('01/01/2017', 'Pacific/Auckland');
// console.log('winter-', s.timezone().current.offset)
// s = spacetime('16/07/2017', 'Pacific/Auckland');
// console.log('summer- ', s.timezone().current.offset)

// let d1 = spacetime([2010, 5, 5, 15, 0], 'Canada/Eastern');
// console.log(d1.timezone())
// d1 = spacetime([2010, 5, 5, 15, 0], 'America/Santiago');
// console.log(d1.timezone())
