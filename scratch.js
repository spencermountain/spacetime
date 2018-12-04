const spacetime = require('./src/index')

// let a = spacetime('June 5', 'toronto')
// let b = spacetime('June 5', 'gmt+4')
//
// console.log(a.offset() / 60)
// console.log(b.offset() / 60)
//
// console.log(a.time())
// console.log(b.time())

let s = spacetime('June 5', 'eastern africa')
console.log(s.timezone())
