const spacetime = require('./src/index')
// spacetime.extend(require('./plugins/week-math/plugin.js'))
// bug 1: roll-forward
// let d = spacetime('2020-03-08T00:31:01', 'America/Chicago')
// d = d.add(30, 'minutes')
// console.log(d.format('nice'))

let s = spacetime('Oct 1st 2020') //.startOf(unit)
console.log(s.format('nice'), s.quarter())
s = s.minus(1, 'quarter')
console.log(s.format('nice'), s.quarter())
// s = s.startOf(unit)
// console.log(s.format('nice'), s.quarter())

// console.log(spacetime('June 1st 2020').quarter())
// console.log(spacetime('2020-06-01').startOf('quarter').format('nice'))
