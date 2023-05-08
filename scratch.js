// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// spacetime.extend(require('./plugins/holiday'))

// let s = spacetime()
// s = s.year(2020)
// s = s.dayOfYear(366);
// console.log(s.json())

let d = spacetime('2022/01/01','utc');
d = d.every('day','2022/12/31');
d.forEach(function (e) {console.log(e.format('iso-short'),e.week())})