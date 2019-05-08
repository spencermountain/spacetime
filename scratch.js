const spacetime = require('./src/index')

console.time('all')
console.log(spacetime('Feb 1 2018').diff(spacetime('Jan 28 2019')))
console.timeEnd('all')
