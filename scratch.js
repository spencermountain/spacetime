const spacetime = require('./src/index')

let str = '2019-01-25T20:00:00+01:00'
let a = spacetime(str)
setTimeout(() => {
  console.log(a.isEqual(str))
})

a = spacetime('2018-03-29 00:00:0.0');
b = a.clone().add(1, 'week')
console.log(b.diff(a))
console.log(b.since(a))