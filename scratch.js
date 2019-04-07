const spacetime = require('./src/index')

let start = spacetime('April 8th 2019').startOf('week')
let end = start.add(25, 'hour') //endOf('week').minus(28, 'hour')
// start.every('day', end).map(s => {
//   console.log(s.format('nice-day'))
// })
console.log(start.diff(end))

// console.log(
//   spacetime
//     .now()
//     .next('wednesday')
//     .format('nice-day')
// )

// s = s.nearest('tuesday') //start of the closest tuesday
// s = s.next('wednesday') //start of the nearest future wednesday
// s = s.next('march') //start of the nearest future march

// let str = '2017-09-02T08:15:10.000+07:00'
// let plus = spacetime(str)
// console.log(plus.timezone().current.offset)
// let iso = plus.format('iso')
// console.log(iso === str)
// console.log(iso)

// bug 1: before march
// let a = spacetime('2019-03-13T18:00:00.000-05:00')
// console.log('timestamp:', a)
// console.log(a.format('iso'))

// BUG 2
// const d = spacetime([2019, 'march', 31], 'Europe/Stockholm')
// console.log(d.format('nice'))
