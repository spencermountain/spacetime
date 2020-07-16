const spacetime = require('./src/index')

let s = spacetime('January 4 2017').time('12:01am')
console.log(s.format('{month} {month-number} {month-pad} {month-iso} {hour-24}'))

// let d = spacetime('june 2nd 1892')
// d.every('year', 'june 2nd 1902').forEach((y) => {
//   console.log(y.format('iso-short'))
// })

// let a = spacetime('jan 1 1894')
// console.log(a.add(1, 'year').format())
// missing 1805

// let str = spacetime('2019-09-29', 'Pacific/Auckland').time('2:01AM').format('time')
// console.log(str)

// let dst = spacetime('2019-09-25', 'Pacific/Auckland')

// for (let i = 0; i < 3; i++) {
//   dst = dst.add(1, 'days')
//   dst = dst.time('1:59AM')
//   console.log(dst.format('nice') + ' (' + dst.isDST() + ')')
//   dst = dst.time('2:01AM')
//   console.log(dst.format('nice') + ' (' + dst.isDST() + ')')
//   dst = dst.time('3:01AM')
//   console.log(dst.format('nice') + ' (' + dst.isDST() + ')')
// }
