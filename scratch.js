import spacetime from './src/01-one/index.js'
// import { DateTime } from "luxon";
// import old from './old/src/index.js'

// let a = spacetime('March 28, 1999 20:42:00')
// a = a.add(45, 'months')
// console.log(a.iso())

// let s = spacetime('2023-03-12T01:39:00-08:00', 'America/Los_Angeles')
// console.log(s.time())

// console.log(spacetime('foo', 'Asia/Riyadh'))

// let config = { tryLocalTimezone: true, fallbackTz: 'Etc/GMT+9.5' }
// spacetime.plugin({ config })
let s = spacetime('2,000 BC')
console.log(s.json())