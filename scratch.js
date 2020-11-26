const spacetime = require('./src/index')
spacetime.extend(require('./plugins/week-math/plugin.js'))
// bug 1: roll-forward
// let d = spacetime('2020-03-08T00:31:01', 'America/Chicago')
// d = d.add(30, 'minutes')
// console.log(d.format('nice'))

// let d = spacetime([], 'America/Chicago')
// console.log(d.format('{nice} {year}'))

// d = spacetime({}, 'America/Chicago')
// console.log(d.format('{nice} {year}'))

// let s = spacetime('2020-03-02t00:00:00.000z')
// console.log(s.format('nice'))

let s = spacetime('saturday oct 10th 2020')
console.log(s.monthWeek())

// s = s.monthWeek(0)
// Mon Sep 28th
// console.log(s.format('nice'))
