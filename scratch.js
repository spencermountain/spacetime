import spacetime from './src/01-one/index.js'
// import { DateTime } from "luxon";
// import old from './old/src/index.js'


// spacetime.world.methods.now = () => 1554092400000
// let s = spacetime({ month: 1, offset: 4 })
// console.log(s.iso())


let d = spacetime('January 12, 2016')
console.log(d.daysInMonth(), 31, 'daysInMonth - Jan. 2016')
