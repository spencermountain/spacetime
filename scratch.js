import spacetime from './src/index.js'
// import { getYear, getStart } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
import old from './old/src/index.js'
// import { HOUR } from '/Users/spencer/mountain/spacetime/src/compute/_lib/millis.js'
// console.log(old('8 bc').iso())


let s = spacetime.now()
console.log(s.time())
s = s.goto('Europe/paris')
console.log(s.time())

// let s = spacetime('July 27th, 2018')
// s = s.minus(10, 'years')
// console.log(s.fmt('iso-short'))

// console.log(s.unixFmt('M'))