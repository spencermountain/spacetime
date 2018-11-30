const spacetime = require('./src/index')

let s = spacetime('June 5', 'toronto time')
s.log()
// console.log(s.format('iso'))
console.log(s.timezone())

// s = s.goto('Jamaica') // "America/Jamaica"
// s = s.goto('Eastern Time') // "America/New_York"
// s = s.goto('PST') // -8h (not the same as PDT!)
// s = s.goto('GMT+8') // -8h!
// s = s.goto('-7h') // -7h
// s = s.goto('bst') //"British summer time" +1 (sorry Bougainville!)

console.log(spacetime.whereIts('11pm'))
