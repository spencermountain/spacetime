const spacetime = require('./src/index')

// let s = spacetime([2020, 1, 29])
// console.log(s.format())

let s = spacetime.now()
s = s.year(2020)
s = s.month(1)
s = s.date(29)
console.log(s.format())
