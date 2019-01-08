const spacetime = require('./src/index')

// let d = spacetime('2019-11-04T00:00:00.000')
// let s = d
// for (let i = 0; i < 7; i += 1) {
//   console.log(s.format('date'))
//   s = s.add(1, 'day')
// }
//
// d = d.add(1, 'week')
// console.log('---')
// for (let i = 0; i < 7; i += 1) {
//   console.log(d.format('date'))
//   d = d.add(1, 'day')
// }


let d = spacetime('2019-11-04T00:00:00.000')
// console.log(d.format('nice-day'))
d = d.add(7, 'days')
console.log(d.format('nice-day') + '  -- Monday 11?')
