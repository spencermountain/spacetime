const spacetime = require('./src/index')

let s = spacetime()
console.log(s.add(1, 'date').format('iso'))
// "2019-11-02T23:00:00.000-08:00"

console.log(s.add(1, 'date').startOf('date').format('iso'))
// "2019-11-02T00:00:00.000-08:00"
