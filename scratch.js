const spacetime = require('./src/index')

// 28 - feb
// 30 - april, june, sept, nov
// 31 - jan, march, may, july, aug, oct, dec

let d = spacetime('December 15, 2004 20:42:00', 'Africa/Algiers')

// d = d.minus(16, 'day')
d = d.minus(365, 'day')
console.log(d.format('nice'))

// let s = spacetime('march 1 2004')
// s = s.subtract(2, 'days')
// console.log(s.date())
// console.log(s.format('nice'))

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
