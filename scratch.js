const spacetime = require('./src/index')

// let s = spacetime([2020, 1, 29])
// console.log(s.format())

// let d = spacetime('june 2nd 1892')
// d.every('year', 'june 2nd 1902').forEach((y) => {
//   console.log(y.format('iso-short'))
// })
// let d = spacetime([2019, 'march', 31], 'Europe/Stockholm')

let d = spacetime(null, 'Europe/Stockholm')
d = d.year(2019)
d = d.month('march')
d = d.date(31)
console.log(d.format())

// let d = spacetime('jan 1 1894')
// d = d.add(1, 'year')
// console.log(d.format())
