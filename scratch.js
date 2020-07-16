const spacetime = require('./src/index')

// let s = spacetime([2020, 1, 29])
// console.log(s.format())

// let d = spacetime('june 2nd 1892')
// d.every('year', 'june 2nd 1902').forEach((y) => {
//   console.log(y.format('iso-short'))
// })

// let d = spacetime('jan 1 1894')
// d = d.add(1, 'year')
// console.log(d.format())

let d = spacetime('1895-01-01')
d = d.minute(0)
console.log(d.format()) //1894-12-31
