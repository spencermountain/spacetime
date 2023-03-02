import spacetime from './src/three.js'
// import { DateTime } from "luxon";
// import old from './old/src/index.js'


let s = spacetime.now()
console.log('sunrise', s.sunrise().time())
console.log('noon', s.solarNoon().time())
console.log('sunset', s.sunset().time())
// console.log(s.dayLength())