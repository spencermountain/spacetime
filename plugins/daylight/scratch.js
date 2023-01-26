import spacetime from 'spacetime'
import sunlight from './src/index.js'
// console.log(tzlookup(42.7235, -73.6931)); // "America/New_York"
// console.log(tzlookup(48.7235, 1.9931)); // paris
// console.log(tzlookup(50.4050, -31.8971)); // atlantic ocean

spacetime.extend(sunlight)

// let s = spacetime.today('America/Iqaluit').time('3:00am')
let s = spacetime.today('america/argentina/comodrivadavia')
// let s = spacetime.today('America/Havana').time('3:00am')

// ---day---
// let hours = s.every('hour', s.add(1, 'day').time('3:00am'))
console.log(s.sunPosition())
// })
// ---year--
// let hours = s.every('hour', s.add(1, 'day'))


