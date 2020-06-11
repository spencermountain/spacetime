const spacetime = require('./src/index')

// let s = spacetime()

let s = spacetime('march 2', null, { today: { year: 1992 } })
console.log(s.format('nice-year'))
