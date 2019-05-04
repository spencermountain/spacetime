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

let s = spacetime('march 4th 2019 11:43pm', 'Europe/Berlin')
s = s.date(31)
console.log(s.format('nice'))

// let s = spacetime([2019, 'march', 31, 3, 3], 'Europe/Berlin')
// console.log(s.format('nice'))
