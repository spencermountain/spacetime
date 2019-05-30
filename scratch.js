const spacetime = require('./src/index')

let s = spacetime('may 30 2019', 'Canada/Eastern')
s = s.weekStart(0)
s = s.startOf('week')
console.log(s.dayName())
