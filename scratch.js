const spacetime = require('./src/index')

// let s = spacetime([2020, 1, 29])
// console.log(s.format())

let s = spacetime('now', null, { today: { year: 2012 } })
console.log(s.format())

// let a = spacetime(null, 'Canada/Eastern')
// let b = spacetime(Date.now(), 'Canada/Eastern')
// console.log(a.format(), b.format())
