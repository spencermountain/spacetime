const spacetime = require('./src')
const ist = require('./immutable')

let day0 = ist.now()
console.log(day0.format('nice'))
console.log(day0.add(2, 'days').format('nice'))
console.log(day0.subtract(1, 'days').format('nice'))
console.log(day0.add(2, 'days').format('nice'))
console.log(day0.format('nice'))

