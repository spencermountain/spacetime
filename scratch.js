const spacetime = require('./src/index')

// let d = spacetime('June 8th').next('month')
// d.log()

let s = spacetime('January 1, 2019 1:20:05')
s = s.time('4:20pm')
s = s.add(1, 'decade')
console.log(s.format('nice-date'))
