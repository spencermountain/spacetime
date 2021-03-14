const spacetime = require('./src/index')
// spacetime.extend(require('./plugins/weekOfMonth/src/index.js'))

let s = spacetime.now()
let res = s.since(spacetime('march 28 1986')).rounded
// '35 years ago'
console.log(res)
