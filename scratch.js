const spacetime = require('./src/index')

// let s = spacetime([2020, 1, 29])
// console.log(s.format())

// let s = spacetime('now', null, { today: { year: 2012 } })
// console.log(s.format())

const date = spacetime(null, 'Asia/Kathmandu')
console.log(date.format('offset'))

// let a = spacetime(null, 'Canada/Eastern')
// let b = spacetime(Date.now(), 'Canada/Eastern')
// console.log(a.format(), b.format())
