const spacetime = require('./src/index')

let before = spacetime('may 31 2018')
let after = spacetime('june 30 2018')
before.log()
after.log()

// before.add(30, 'days').log()

console.log(before.diff(after, 'months'))
