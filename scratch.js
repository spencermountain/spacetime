const spacetime = require('./src/index')

// let d = spacetime({ month: 'june', year: 2019 })
// d.log()
// console.log(spacetime.every('month', 'October 2nd 2019'))
let d = spacetime('June 5th 2019')
console.log(d.format('iso-short'))
