const spacetimeTicks = require('./src')

console.time('d')
let ticks = spacetimeTicks('jan 1 2019', 'jan 1 2020', 12)
console.log(ticks)
console.timeEnd('d')
