const spacetime = require('./src/index')

// let start = spacetime('April 6th 2019')
// let end = spacetime('April 7th 2019')
// start.every('tuesday', end).map(s => {
//   console.log(s.format('nice'))
// })

// console.log(
//   spacetime
//     .now()
//     .next('wednesday')
//     .format('nice-day')
// )

let iso = '2017-01-01T08:00:00.000Z'
let s = spacetime(iso, 'Asia/Taipei')
console.log(s.timezone())
console.log(s.format('iso'))
