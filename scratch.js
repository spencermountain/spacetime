const spacetime = require('./src/index')

// '03/29:02->10/25:03'
// let s = spacetime('Oct 25th 2020 2:00am', 'europe/brussels')
// console.log(s.format(), s.time())
// console.log(s.timezone().current.isDST + ' should be true')

// 11/01:02
// let s = spacetime('Nov 1st 2020 1:50am', 'america/chicago')
// console.log(s.format(), s.time())
// console.log(s.timezone().current.isDST + ' should be true')

let s = spacetime('summer 2001')
console.log(s.format())

// console.log('summer 2001'.match(/^(spring|summer|winter|fall|autumn)( [0-9]{4})?/))
