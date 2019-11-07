const spacetime = require('./src/index')

// d.toDateString()
// let s = spacetime('Fri Jun 28 2019')

// // d.toGMTString()
// let s = spacetime('Fri, 28 Jun 2019 16:26:14 GMT') // x

// // d.toUTCString()
// let s = spacetime('Fri, 28 Jun 2019 16:26:14 GMT')
// let s = spacetime('Fri, 28 Jun 2019')

// // d.toISOString()
// let s = spacetime('2019-06-28T16:26:14.797Z')

// // d.toLocaleString()
// let s = spacetime('6/28/2019, 12:26:14 PM')

// // d.toString()
// let s = spacetime('Fri Jun 28 2019 12:26:14 GMT-0400 (Eastern Daylight Time)') //x

// // d.toLocaleTimeString()
// let s = spacetime('12:26:14 PM')
// // d.toTimeString()
// let s = spacetime('12:26:14 GMT-0400 (Eastern Daylight Time)')

let s = spacetime('03/25/2015')
console.log(s.format('nice-year'))
console.log(s.format('time'))
