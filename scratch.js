const spacetime = require('./src/index')

// let s = spacetime('Tuesday August 1st, 12:00am')
// console.log(s.format('nice'))

let s = spacetime('Aug 1st').time('12:00am')
// s = s.hour(12)
s = s.ampm('am')
// s = s.ampm('pm')
console.log(s.format('nice'))
