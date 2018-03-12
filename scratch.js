const spacetime = require('./src/index')

let s = spacetime([2017, 5, 2]).subtract(23, 'days')
s.log()

console.log(s.since())
