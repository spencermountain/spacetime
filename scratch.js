const spacetime = require('./src/index')

console.time('time')
let s = spacetime('june 20 2019')
s.week()
console.timeEnd('time')
