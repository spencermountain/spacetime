import spacetime from './src/index.js'
import { getYear, getStart } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
import old from './old/src/index.js'
// import { HOUR } from '/Users/spencer/mountain/spacetime/src/compute/_lib/millis.js'


let input = "2023-12-22T00:30:20.030-05:45"
let s = spacetime(input)

console.log(s.hourFloat())