'use strict';
const spacetime = require('./src');
// const moment = require('moment-timezone')
// const spacetime = require('./builds/spacetime');

// let s = spacetime(1510799750000, 'Pacific/Auckland');
// s.log()
// console.log(s.timezone())


// yyyy.MM.dd G 'at' HH:mm:ss zzz	1996.07.10 AD at 15:08:56 PDT
// EEE, MMM d, ''yy	Wed, July 10, '96
// h:mm a	12:08 PM
// hh 'o''clock' a, zzzz	12 o'clock PM, Pacific Daylight Time
// K:mm a, z	0:00 PM, PST
// yyyyy.MMMM.dd GGG hh:mm aaa	01996.July.10 AD 12:08 PM
let s = spacetime();
// console.log(s.format(`LL`))
console.log(s.format(`yyyyy.MMMM.dd GGG hh:mm aaa`))
