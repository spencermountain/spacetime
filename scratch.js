const spacetime = require('./src/index')

let t = spacetime('2019-11-05T11:00:00.000-03:00')
console.log(t.timezone().current.offset) // -3
t = t.goto('America/Sao_Paulo')
console.log(t.timezone().current.offset) // -2
console.log(t.format('iso'))
