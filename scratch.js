const spacetime = require('./src/index')

console.time('all')
let diff = spacetime('Feb 11 1500').diff(spacetime('March 11 2018'))
console.log(diff)
console.timeEnd('all')

// let a = spacetime('July 27 2018')
// let b = a.clone().minus(20, 'years')
//
// let obj = b.diff(a)
// console.log(obj)
