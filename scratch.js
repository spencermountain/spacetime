import spacetime from './src/three.js'
// import { DateTime } from "luxon";
import old from './old/src/index.js'


// 'Asia/Riyadh'
// let a = spacetime('2023-01-01')//.minus(0, 'days')
// let b = old('2023-01-01')//.minus(0, 'days')

// console.log(a.week())
// console.log(b.week())
// let s = spacetime()
let s = spacetime.now()
s = s.play()
setInterval(() => {
  console.log(s.iso())
}, 500);