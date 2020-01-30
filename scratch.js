const spacetime = require('./src/index')

let s = spacetime.now('Canada/Eastern')

console.log(s.iso())
console.log(s.toLocalDate())
