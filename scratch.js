import spacetime from './src/index.js'

// console.log(spacetime('Feb 29 2001').iso())

let s = spacetime('jan 5 2028 4:30pm')
console.log(s.millenium());
console.log(s.millennium());

