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

let s = spacetime([2019, 4, 8, 10, 11, 12])
s = s.time('3:31pm')
s = s.startOf('quarter-hour')
console.log(s.format('time'))
