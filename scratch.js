import spacetime from './src/index.js'
import { getYear, getStart } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
import old from './old/src/index.js'
// import { HOUR } from '/Users/spencer/mountain/spacetime/src/compute/_lib/millis.js'



let s = spacetime('2019-04-01T12:15:00.000+03:00')
// s = s.add(2, 'day')
console.log(s)
console.log(s.format('iso'))