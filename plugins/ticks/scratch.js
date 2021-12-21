import spacetimeTicks from './src/index.js'

console.time('time')
let ticks = spacetimeTicks('jan 1 2019', 'jan 1 2020', 12)
console.log(ticks)
console.timeEnd('time')
