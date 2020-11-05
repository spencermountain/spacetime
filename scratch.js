const spacetime = require('./src/index')

// '03/29:02->10/25:03'
// let s = spacetime('Oct 25th 2020 2:00am', 'europe/brussels')
// console.log(s.format(), s.time())
// console.log(s.timezone().current.isDST + ' should be true')

// 11/01:02
// let s = spacetime('Nov 1st 2020 1:50am', 'america/chicago')
// console.log(s.format(), s.time())
// console.log(s.timezone().current.isDST + ' should be true')

// -5hrs -> -6hrs
let d = spacetime('2020-11-01T00:00:00', 'America/Chicago')
console.log(d.timezone())
console.log(d.iso())
