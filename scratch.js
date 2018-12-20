const spacetime = require('./src/index')

// let a = spacetime('June 5', 'toronto')
// let b = spacetime('June 5', 'utc/gmt+4')
//
// console.log(a.offset() / 60)
// console.log(b.offset() / 60)
//
// console.log(a.time())
// console.log(b.time())

// let s = spacetime('July 4', 'berlin')
// let s = spacetime('July 4', 'toronto')
// console.log(s.format('month-short'))
//s= s.month('august')
// console.log(s.timezone())
// console.log(s.format('{nice}'))

let s = spacetime(null, 'europe/london');
// s.silent = false
console.log(s)
console.log(s.d)
// s = s.startOf('day')
// console.log(s.format())

//'daylight savings' happens in the summer
