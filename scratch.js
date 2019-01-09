const spacetime = require('./src/index')

// let d = spacetime('June 8th').next('month')
// d.log()
let d = spacetime('2019-11-04T00:00:00.000')


d = d.add(1, 'week')
console.log(d.format('day-nice'))
