import spacetime from './src/01-one/index.js'
import { DateTime } from "luxon";
// import old from './old/src/index.js'


// spacetime.world.methods.now = () => 1554092400000
// let s = spacetime({ month: 1, offset: 4 })
// console.log(s.iso())


// let d = spacetime('January 12, 2016')
// console.log(d.daysInMonth(), 31, 'daysInMonth - Jan. 2016')

console.log(spacetime.now().epoch)
// let arr = [
//   { year: 1983 },
//   { year: 1982, month: 2 },
//   { year: 1981, month: 1, day: 25 },
//   { month: 2 },
//   { month: 7, day: 3 },
//   { year: 1982, day: 25 },
//   { year: 1982, hour: 4 },
//   { year: 1982, month: 12 },
//   { year: 1982, month: 12, day: 1 },
//   { year: 1982, month: 12, day: 33 },
//   { year: 1982, month: 2, day: 29 },
//   { year: 2000, month: 9, day: 29 },
//   { year: 3000, month: 9, day: 29 },
//   { year: 1980, month: 12, day: 29 },
//   { year: 1980, month: 12, day: 29, hour: 9, minute: 59 },
//   { year: 1980, month: 12, day: 29, hour: 9, minute: 60 },
//   { hour: 23 },
//   { day: 21 },
//   { minute: 21 },
//   { second: 21 },
//   { millisecond: 21 },
//   { year: 2019, millisecond: 21 },
//   { hour: 25 },
//   { day: -2 },
//   { minute: -1 },
//   { second: 60 },
//   { millisecond: -2 },
//   { millisecond: 2000 },
//   { year: 2000, hour: 2 },
//   { year: -2000, hour: 2 },
//   { second: -2000, hour: 2 },
// ]

// let out = []
// arr.forEach(o => {
//   let iso = DateTime.fromObject(o).toISO() //=> '1982-05-25'
//   out.push([o, iso])
// })
// console.log(out)