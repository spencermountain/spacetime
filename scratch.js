const spacetime = require('./src/index')

let a = spacetime(1506150000000, 'Canada/Pacific')
let b = spacetime(1512115200000, 'Canada/Pacific')
a.logYear()
b.logYear()
console.log(a.diff(b, 'days'))

a.add(70, 'days')
a.logYear()
