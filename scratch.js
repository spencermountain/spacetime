const spacetime = require('./src/index')

// d = d.minute(90)
// d = d.second(90)
// d = d.millisecond(90)
// d = d.dayOfYear(369)

// bug 1: before march
let s = spacetime('2011-01-01T18:00:00.000+00:30')
// console.log(s.timezone())
console.log(s.format('iso'))
