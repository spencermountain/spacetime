import spacetime from './src/01-one/index.js'
import { DateTime } from "luxon";
// import old from './old/src/index.js'



// let s = spacetime('2021-01-01T00:00:00.000+02:30')
// s = s.add(22, 'minute').minus(44, 'minute').add(22, 'minute')
// console.log(s.iso())

let s = spacetime.now()
console.log(s.progress())
// console.log(new Date().toLocaleString())
// console.log(s.hour())
