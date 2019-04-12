const spacetime = require('./src/index')

// bug 1: before march
// let a = spacetime('2019-03-13T18:00:00.000-05:00')
// console.log('timestamp:', a)
// console.log(a.format('iso'))

// BUG 2
// const d = spacetime([2019, 'june'], 'Europe/Stockholm')
// console.log(d.format('nice'))

let d = spacetime('April 4')
d = d.hours(-3)
// console.log(d.isValid())
// d = d.time('12am')
console.log(d.format('nice'))
