const spacetime = require('./src/index')

// let s = spacetime('October 6th 2019', 'australia/sydney') //.time('6:20pm')
// s.log()
// s = s.startOf('day')
// s.log()

console.log(spacetime('jan 1th 2018').week()) //tues
console.log(spacetime('jan 9th 2018').week()) //wed
console.log(spacetime('jan 15th 2018').week()) //tues
