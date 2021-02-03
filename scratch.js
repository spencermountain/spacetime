const spacetime = require('./src/index')
spacetime.extend(require('./plugins/week-math/plugin.js'))
// bug 1: roll-forward
// let d = spacetime('2020-03-08T00:31:01', 'America/Chicago')
// d = d.add(30, 'minutes')
// console.log(d.format('nice'))

// let epoch = 1552114800001
// let a = spacetime(epoch, 'Canada/Pacific')
// // let b = a.ampm('am')
// console.log(a.time(), a.ampm())
// console.log(b.time(), b.ampm())
// console.log(a.epoch === b.epoch)

console.log(spacetime.timezones())
