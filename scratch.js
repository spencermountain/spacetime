const spacetime = require('./src/index')

// let s = spacetime('July 27 2018')
// let s = spacetime('June 5 2019, 5:5')
// let s = spacetime('Tuesday August 1st, 12:00am')
let s = spacetime('August 1, 2017 00:01:05')
console.log(s.format('nice'))
