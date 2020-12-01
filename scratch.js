const spacetime = require('./src/index')
// spacetime.extend(require('./plugins/week-math/plugin.js'))
// bug 1: roll-forward
// let d = spacetime('2020-03-08T00:31:01', 'America/Chicago')
// d = d.add(30, 'minutes')
// console.log(d.format('nice'))

// let s = spacetime('09.13.2013')
let s = spacetime('13.09.2013')
console.log(s.format())
