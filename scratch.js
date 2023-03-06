import spacetime from './src/three.js'
// import { DateTime } from "luxon";
import old from './old/src/index.js'


// 'Asia/Riyadh'
// let a = spacetime('2023-01-01')//.minus(0, 'days')
// let b = old('2023-01-01')//.minus(0, 'days')

let a = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
a = a.add(45, 'months')
console.log(a.iso())