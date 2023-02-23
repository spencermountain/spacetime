import spacetime from './src/index.js'
import { getYear, getStart } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
import old from './old/src/index.js'
// import { HOUR } from '/Users/spencer/mountain/spacetime/src/compute/_lib/millis.js'
console.log(old([2018, 'February', 20]).month())


let s = spacetime('2,000 BC')
// s = s.add(30, 'year')
// console.log(s.iso())
console.log(s.json())
// console.log(s.unixFmt('M'))