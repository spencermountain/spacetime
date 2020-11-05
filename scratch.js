const spacetime = require('./src/index')

// bug 1: roll-forward
let d = spacetime('2020-03-08T00:31:01', 'America/Chicago')
d = d.add(30, 'minutes')
console.log(d.format('nice'))
