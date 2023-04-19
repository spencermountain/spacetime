import spacetime from './src/01-one/index.js'
// import spacetime from './src/03-three/index.js'
// import { DateTime } from "luxon";
import old from './old/src/index.js'

let d = spacetime('2022/01/01');
console.log(d.format('iso-short'), d.week())
