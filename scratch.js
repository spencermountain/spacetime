const spacetime = require('./src/index')

// let s = spacetime([2020, 1, 29])
// console.log(s.format())

let d = spacetime('june 2nd 1892')
d.every('year', 'june 2nd 1902').forEach((y) => {
  console.log(y.format('iso-short'))
})

d = spacetime('jan 1 1894')
d = d.add(1, 'year')
console.log(d.format())

d = spacetime('1895-01-01') //.startOf('day')
d = d.minute(0)
console.log(d.format('')) //1894-12-31
