import spacetime from './src/three.js'
// import { DateTime } from "luxon";
// import old from './old/src/index.js'


// 'Asia/Riyadh'
let a = spacetime(null)
// let b = spacetime(null)

console.log(a.next('week').iso())