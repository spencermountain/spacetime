const spacetime = require('./src/index')

// let start = spacetime.now()
// let end = spacetime('October 2nd 2019', 'Europe/Paris')
// console.log(start.every('month', end))

// let s = spacetime('2019-04-01T12:15:00.000+04:00')
// console.log(s.format('iso'))

let s = spacetime.now()
s.tz = 'UTC'
console.log(s.timezone())
