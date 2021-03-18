const spacetime = require('spacetime')
const geo = require('./src/index')
// const geo = require('./builds/spacetime-geo')

spacetime.extend(geo)

let s = spacetime('june 4 2018', 'Canada/Eastern') //.time('3:37pm')
s = s.in([48.7235, 1.9931]) //near paris
console.log(s.timezone().name)
