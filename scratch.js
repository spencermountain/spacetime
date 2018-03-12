const spacetime = require('./src/index')

let s = spacetime([2017, 3, 28]).subtract(23, 'days')
console.log(s.since())
