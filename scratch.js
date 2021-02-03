const spacetime = require('./src/index')
spacetime.extend(require('./plugins/week-math/plugin.js'))
// bug 1: roll-forward
// let d = spacetime('2020-03-08T00:31:01', 'America/Chicago')
// d = d.add(30, 'minutes')
// console.log(d.format('nice'))

// let d = spacetime('03/02', null, { today: { date: 21, month: 0, year: 2018 } })
// let d = spacetime('summer', null, { today: { date: 21, month: 0, year: 2018 } })
let d = spacetime('q2', null, { today: { date: 21, month: 0, year: 2018 } })
console.log(d.iso())
