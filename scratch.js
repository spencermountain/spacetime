const spacetime = require('./src/index')
// spacetime.extend(require('./plugins/week-math/plugin.js'))
// bug 1: roll-forward
// let d = spacetime('2020-03-08T00:31:01', 'America/Chicago')
// d = d.add(30, 'minutes')
// console.log(d.format('nice'))

let s = spacetime('2012-07')
// s = s.time('1:02:12 PM')
// s = s.time()
console.log(s.format())
