import spacetime from './src/index.js'

// console.log(spacetime('Feb 29 2001').iso())

// 
// let s = spacetime('1995-12-07T03:24:30', 'Africa/Cairo')
// s = s.timezone('America/Toronto')
// console.log(s.iso())


let s = spacetime('2011-12-03T10:15:30+01:00[Europe/Paris]')
let json = s.json()
console.log(json)
let b = spacetime(json)
// b.debug()
console.log(b.iso())
// console.log(b.json())
// console.log(s.format('iso-short'))