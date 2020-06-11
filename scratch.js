const spacetime = require('./src/index')

let s = spacetime({ year: 1921 })
console.log(s.format('nice-year'))
