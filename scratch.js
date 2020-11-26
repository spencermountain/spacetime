const spacetime = require('./src/index')

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

let a = spacetime() //.week(0)
console.log(a.day())
// let b = spacetime('2020-03-02T01:03:10.000Z')
console.log(a.iso())
