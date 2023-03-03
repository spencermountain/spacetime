import spacetime from './src/three.js'
// import { DateTime } from "luxon";
import old from './old/src/index.js'


// 'Asia/Riyadh'
// let a = spacetime('2023-01-01')//.minus(0, 'days')
// let b = old('2023-01-01')//.minus(0, 'days')

// console.log(a.week())
// console.log(b.week())
// let s = spacetime()
let start = spacetime('jan 21st 2020 2:00am', 'Canada/Pacific') //.add(5, 'minutes')
// let end = spacetime('jan 21st 2020 2:00pm', 'Canada/Eastern')
// console.log(start.isSame(end, 'hour'))
console.log(start.nearest('day').iso())