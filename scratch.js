const spacetime = require('./src/index')

let orig = spacetime(1552114800001, 'Canada/Pacific')
orig.log()
let s = orig.ampm('pm')
console.log('---')
s.log()
orig.log()
