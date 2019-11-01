const spacetime = require('./src/index')

// let s = spacetime('October 6th 2019', 'australia/sydney') //.time('6:20pm')
// s.log()
// s = s.startOf('day')
// s.log()

let t = spacetime('2019-11-05T11:00:00.000-03:00')
console.log(t.timezone().current.offset)
t = t.goto('America/Sao_Paulo')
console.log(t.timezone().current.offset)
console.log(t.format('iso'))
