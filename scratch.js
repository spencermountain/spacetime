import spacetime from './src/index.js'

// console.log(spacetime('Feb 29 2001').iso())

// 
// let s = spacetime('1995-12-07T03:24:30', 'Africa/Cairo')
// s = s.timezone('America/Toronto')
// console.log(s.iso())


let s = spacetime('2023-01-01T5:30[America/Denver]')
console.log(s.format('iso-full'))
s.timezone('Europe/Zagreb') // hot-swap
console.log(s.format('iso-full'))