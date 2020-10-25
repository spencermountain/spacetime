const spacetime = require('./src/index')

// let s = spacetime([2020, 1, 29])
// console.log(s.format())

// let s = spacetime('now', null, { today: { year: 2012 } })
// console.log(s.format())

let s = spacetime(null, 'America/Fort_Nelson')
console.log(s.time())
