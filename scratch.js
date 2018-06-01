const spacetime = require('./src/index')

let tz = 'Asia/Ulaanbaatar'
let s = spacetime('March 28, 1999', tz);
s.log()
