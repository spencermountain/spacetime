import spacetime from './src/01-one/index.js'
import { DateTime } from "luxon";
// import old from './old/src/index.js'



// let s = spacetime('2021-01-01T00:00:00.000+02:30')
// s = s.add(22, 'minute').minus(44, 'minute').add(22, 'minute')
// console.log(s.iso())

// let epoch = 1679578175954

// console.log(spacetime.now().tz)
// let jan1 = spacetime.world.methods.getYear(epoch, 'Etc/GMT+4', spacetime.world)
let s = spacetime('2011-01-01T18:00:00.000+00:30')//.time('4:12pm')
console.log(s.tz)
console.log(s.iso())
// console.log(s.time())
