const spacetime = require('./src/index')

// let a = spacetime('June 5', 'toronto')
// let b = spacetime('June 5', 'utc/gmt+4')
//
// console.log(a.offset() / 60)
// console.log(b.offset() / 60)
//
// console.log(a.time())
// console.log(b.time())

let s = spacetime('July 4', 'jesrsey')
console.log(s.timezone())
//s= s.month('august')
// console.log(s.timezone())
// console.log(s.format('{nice}'))
