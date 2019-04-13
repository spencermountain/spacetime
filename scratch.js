const spacetime = require('./src/index')

// d = d.minute(90)
// d = d.second(90)
// d = d.millisecond(90)
// d = d.dayOfYear(369)

// let start = spacetime('April 8th 2019').startOf('week')
// let end = start.add(25, 'hour')
// console.log(start.diff(end))

console.time('start')
console.log('-start-')
let diff = spacetime.now().diff('jan 2 1892')
console.log(diff)
console.timeEnd('start')
