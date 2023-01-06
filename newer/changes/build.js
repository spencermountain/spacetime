import prepYear from './prepYear.js'
import guessTz from '../lib/guessTz.js'
import zoneFile from '../zonefile/zonefile.2022.js'

let year = 2023

let structure = {}

let begin = new Date()

Object.keys(zoneFile).forEach(k => {
  prepYear(structure, k, year - 1)
  prepYear(structure, k, year)
  prepYear(structure, k, year + 1)
})




// prime it with some obvious ones
prepYear(structure, 'Etc/Utc', year)

let tz = guessTz()
// if (tz) {
//   prepYear(structure, tz, year - 1)
//   prepYear(structure, tz, year)
//   prepYear(structure, tz, year + 1)
// }

let end = new Date()
console.log((end.getTime() - begin.getTime()))
// console.dir(structure, { depth: 5 })
export default structure