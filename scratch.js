const spacetime = require('./src/index')

// console.time('all')
// let diff = spacetime('June 11 2017').diff(spacetime('March 11 2018'), 'day')
// console.log(diff)
// console.timeEnd('all')

// let a = spacetime('July 27 2018')
// let b = a.clone().minus(20, 'years')
//
// let obj = b.diff(a)
// console.log(obj)

let s = spacetime('jan 2 2019', 'Canada/Eastern')
s = s.nearest('month')
console.log(s.format('nice'))
