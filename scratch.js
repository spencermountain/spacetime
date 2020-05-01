const spacetime = require('./src/index')

// let s = spacetime()

let arr = spacetime('march 2 2021').every('week', 'jan 2 2021')
console.log(arr.map((d) => d.format()))
