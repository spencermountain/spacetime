import spacetime from './src/index.js'
import { getYear, getStart } from './src/compute/_lib/yearStart.js'
import { DateTime } from "luxon";
import old from './old/src/index.js'
// import { HOUR } from '/Users/spencer/mountain/spacetime/src/compute/_lib/millis.js'


// let input = "2023-12-22T00:30:20.030-09:00"
let input = "2023-01-01T02:34:20.030"
let s = spacetime(input)//.week(0)
// s = s.endOf('hour')
// s = s.add(2, 'days')
// console.log(s.offset())
// s = s.year(2040)
s = s.add(366, 'date')
// s = s.day('tues', false)
console.log(s.format('{iso-short}  {time}'))
// console.log(s.unixFmt('A'))