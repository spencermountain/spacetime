// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

let s = spacetime('feb 1st 2023', 'Africa/Casablanca')
console.log(s.timezone().current.offset)
s = spacetime('apr 1st 2023', 'Africa/Casablanca')
console.log(s.timezone().current.offset)
s = spacetime('oct 1st 2023', 'Africa/Casablanca')
console.log(s.timezone().current.offset)

// s = spacetime.now('Europe/Lisbon')
// console.log(s.time())


// s = s.year(2020)
// s = s.dayOfYear(366);
// console.log(s.dayTime());

// let s = spacetime('03/31/2002', 'America/Denver')
// console.log(s.iso())

// casablanca is + 1, 0, +1
