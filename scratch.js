const spacetime = require('./src/index')

// let s = spacetime('june 20 2019', '-5:00')
// console.log(s.timezone())
// const s = '2019-09-28T07:30:00.000-07:00'
// // 7:30am in la on 28th
// const s1 = spacetime(s).goto('America/Los_Angeles')

// // 4:30am next day in pacific
// const s2 = s1.goto('Pacific/Kiritimati')
// console.log(s2.format('iso'))
// // console.log(s2.d.toISOString())

// // 1:30am in la on 29th
// const s3 = spacetime(s2).goto('America/Los_Angeles')
// s3.log()
let s = spacetime('2019-09-29T04:30:00.000+14:00')
console.log(s.timezone())
//   .format('iso')

// console.log(s) // '2019-09-28T07:30:00.000-07:00'
// console.log(s1.format('iso')) // '2019-09-28T07:30:00.000-07:00'
// console.log(s2) // 2019-09-29T04:30:00.000+14:00
// console.log(s3) // 2019-09-29T04:30:00.000-07:00
