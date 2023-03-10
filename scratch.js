import spacetime from './src/01-one/index.js'
// import { DateTime } from "luxon";
// import old from './old/src/index.js'

// let a = spacetime('March 28, 1999 20:42:00')
// a = a.add(45, 'months')
// console.log(a.iso())


// console.log(spacetime('foo', 'Asia/Riyadh'))

let config = { tryLocalTimezone: true, fallbackTz: 'Etc/GMT+9.5' }
spacetime.plugin({ config })
console.log(spacetime.now().tz)