const spacetime = require('./src/index')

// d = d.minute(90)
// d = d.second(90)
// d = d.millisecond(90)
// d = d.dayOfYear(369)

// let start = spacetime('April 8th 2019').startOf('week')
// console.log(start.format('nice-year'))
// start = start.add(0, 'years')
// console.log(start.format('nice-year'))

// let now = spacetime('march 3 2019')
// let c = spacetime('dec 25 2018')
// let obj = now.since(c)
// console.log(obj)

let s = spacetime('sept 1 1600')
console.time('diff')
console.log(s.diff(spacetime.now()))
console.timeEnd('diff')
