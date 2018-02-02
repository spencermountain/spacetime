const spacetime = require('./src/index')

const s = spacetime(null, 'Canada/Eastern')

console.log(s.format('M'))
console.log(s.format('MM'))
console.log(s.format('MMM'))
console.log(s.format('MMMM'))







// let s = spacetime([1970, 1, 1], 'UTC')
// console.log(new Date(s.epoch * 1000))
//
// s = spacetime([2054, 10, 1], 'UTC')
// console.log(new Date(s.epoch / 1000))

// new handy warning in spacetime@3.0
// Fun fact: we're only subject-to these 'off-by-thousand' date errors between Sept 2001 and Jan 2057.

// console.time('test')
// for (let i = 0; i < 10000; i += 1) {
//   let r = parseInt(Math.random() * 5, 10)
//   let s = spacetime([1980 + r, r, 20 + r], 'UTC')
//   s.format('date')
// }
// console.timeEnd('test')
