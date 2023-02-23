import spacetime from './src/index.js'
import { getYear, getStart } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
import old from './old/src/index.js'
// import { HOUR } from '/Users/spencer/mountain/spacetime/src/compute/_lib/millis.js'


// let input = "2023-12-22T00:30:20.030-09:00"
let input = "2023-01-01T02:30:20.030"
// let s = spacetime(input)//.week(0)

let s = spacetime('January 1, 2017 1:20:05', 'Canada/Eastern')

console.log(s.iso())
// s = s.add(1, 'week')
console.log(s.format('nice-day'))