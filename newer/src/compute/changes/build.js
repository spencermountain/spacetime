import prepYear from './prepYear.js'
import config from '../config.js'
// import zoneFile from '../zonefile/zonefile.2022.js'

let structure = {}
let year = config.fallbackYear

// let begin = new Date()
// Object.keys(zoneFile).forEach(k => {
//   prepYear(structure, k, year - 1)
//   prepYear(structure, k, year)
//   prepYear(structure, k, year + 1)
// })
// let end = new Date()
// console.log((end.getTime() - begin.getTime()))

// prime it with some obvious ones
prepYear(structure, 'Etc/Utc', year - 1)
prepYear(structure, 'Etc/Utc', year)
prepYear(structure, 'Etc/Utc', year + 1)

let tz = config.fallbackTz
if (tz) {
  prepYear(structure, tz, year - 1)
  prepYear(structure, tz, year)
  prepYear(structure, tz, year + 1)
}

export default structure