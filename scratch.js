const spacetime = require('./src/index')

let s = spacetime('June 5', ' toroNto standard time')
s.log()
// console.log(s.format('iso'))
console.log(s.timezone())
