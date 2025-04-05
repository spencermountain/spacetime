import spacetime from './src/index.js'

// console.log(spacetime('Feb 29 2001').iso())

// 
// let s = spacetime('1995-12-07T03:24:30', 'Africa/Cairo')
// s = s.timezone('America/Toronto')
// console.log(s.iso())


// / Expected: "August 22, 12:10PM"
let str = spacetime("2024-08-22T12:20:08.140-04:00").format('{month} {date}, {hour}:{minute-pad}{AMPM}')
console.log(str)
// Received: "August 22, 12:10pm"