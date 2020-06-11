const spacetime = require('./src/index')

let s = spacetime('Feb 1 2017')
console.log(s.format('nice'))

// s = s.add(1, 'day')
s = s.add(2, 'day')
console.log(s.format('nice'))

// let s = spacetime('Oct 31 2020')
// console.log(s.format('nice'))

// // s = s.add(1, 'day')
// s = s.add(2, 'day')
// console.log(s.format('nice'))

// let d = spacetime(1572681600000, 'America/Los_Angeles')
// for (let i = 0; i < 12; i += 1) {
//   d = d.add(1, 'day')
//   console.log(d.format('nice'))
// }
