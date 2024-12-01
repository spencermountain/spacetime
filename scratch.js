import spacetime from './src/index.js'

// console.log(spacetime('Feb 29 2001').iso())


const date = spacetime.now().week(14);
console.log(date.iso())
console.log(date.week()) 