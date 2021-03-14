const spacetime = require('./src/index')
spacetime.extend(require('./plugins/age/src/index.js'))

let s = spacetime('may 17 1984')
console.log(s.age('months'))
