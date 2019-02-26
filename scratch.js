const spacetime = require('./src/index')

let s = spacetime('Tuesday August 1st, 12:00am')
console.log(s.format('nice'))
