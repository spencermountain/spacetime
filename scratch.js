const spacetime = require('./src/index')

let s = spacetime([1990, 2, 2], 'UTC')
s.log()


// let s = spacetime([1970, 1, 1], 'UTC')
// console.log(new Date(s.epoch * 1000))
//
// s = spacetime([2054, 10, 1], 'UTC')
// console.log(new Date(s.epoch / 1000))

// new handy warning in spacetime@3.0
// Fun fact: we're only subject-to these 'off-by-thousand' date errors between Sept 2001 and Jan 2057.

// console.time('test')
// for (let i = 0; i < 20000; i += 1) {
//   let r = parseInt(Math.random() * 5, 10)
//   let s = spacetime([1980 + r, r, 20 + r], 'UTC')
// }
// console.timeEnd('test')
