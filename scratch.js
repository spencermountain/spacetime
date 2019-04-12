const spacetime = require('./src/index')

// d = d.minute(90)
// d = d.second(90)
// d = d.millisecond(90)
// d = d.dayOfYear(369)

// bug 1: before march
let a = spacetime('2019-03-13T18:00:00.000-05:00')
console.log(a.timezone())
console.log(a.format('iso'))
