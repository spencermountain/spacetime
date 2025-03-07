import spacetime from './src/index.js'

// console.log(spacetime('Feb 29 2001').iso())

// 
// let s = spacetime('1995-12-07T03:24:30', 'Africa/Cairo')
// s = s.timezone('America/Toronto')
// console.log(s.iso())





let s = spacetime('2014-12-31')
// let s = spacetime('2014-01-01')
// s = s.week(1)
s = s.week(2)
console.log(s.format('iso-short'))