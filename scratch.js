import spacetime from './src/index.js'
import { getYear, getStart } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
import old from './old/src/index.js'
// import { HOUR } from '/Users/spencer/mountain/spacetime/src/compute/_lib/millis.js'


// let input = "2023-12-22T00:30:20.030-09:00"
let input = "2020-02-12T02:34:20.030"
let s = spacetime.now()
// s = s.endOf('hour')
// s = s.add(2, 'days')
// console.log(s.offset())
console.log(s.unixFmt('ZZZ'))
console.log(s.unixFmt('A'))