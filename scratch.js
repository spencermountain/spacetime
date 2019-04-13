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

let s = spacetime('dec 25 2018')
console.log(s.format('nice-year'))
s = s.add(0, 'year')
console.log(s.format('nice-year'))
