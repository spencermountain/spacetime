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

// let iso = '2017-01-01T08:00:00.000Z'
// let s = spacetime(iso, 'Asia/Taipei')
// console.log(s.timezone())
// console.log(s.format('iso'))

// s = s.nearest('tuesday') //start of the closest tuesday
// s = s.next('wednesday') //start of the nearest future wednesday
// s = s.next('march') //start of the nearest future march

let str = '2018-07-09T12:59:00.000+07:00'
let plus = spacetime(str)
let iso = plus.format('iso')
console.log(iso === str)
console.log(iso)
