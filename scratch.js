const spacetime = require('./src/index')

let d = spacetime('2019-11-04T00:00:00.000', 'Canada/Eastern')
d = d.add(7, 'days')
console.log(d.format('nice-day') + '  -- Monday 11?')
