const spacetime = require('./src/index')

let d = spacetime.now()

let end = spacetime('October 2nd 2019', 'Europe/Paris')
console.log(d.every('month', end))
