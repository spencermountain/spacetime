const spacetime = require('./src/index')

let s = spacetime(null)
console.log(s.format('nice-year'))
s = spacetime(undefined)
console.log(s.format('nice-year'))

s = spacetime('January 1, 2017', 'Canada/Eastern')
//initial state
console.log(s.format())
