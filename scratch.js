const spacetime = require('./src/index')

let d = spacetime(1512115200000, 'Canada/Pacific')
let today = spacetime(1506150000000, 'Canada/Pacific')
console.log('start')
console.log(today.diff(d, 'days'))
console.log('done\n\n')
spacetime('Feb 29 2001').log()
console.log(spacetime('Feb 29 2001').isValid())


// let s = spacetime(1509692400000)
// s.log()
// s.add(1, 'date')
// s.log()
