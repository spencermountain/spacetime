// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

import getDst from './new-src/src/index.js'
import tzdb from './new-src/tzdb/index.js'
import zones from './new-src/data/zonefile.2022.js'

const isCorrect = function (tz, year) {
  let changes = getDst(tz, year)
  if (!tzdb[tz] || !tzdb[tz][year]) {
    // console.log(tz)
    return true
  }
  let fromDb = tzdb[tz][year]
  if (changes.start === fromDb[0] && changes.end === fromDb[1]) {
    return true
  }
  // console.log(tz, changes)
  console.log(zones[tz])
  // if (changes.start !== fromDb[0]) {
  //   console.log('--start--')
  //   console.log('have', spacetime(changes.start, tz).format('{nice-day} {time}'))
  //   console.log('want', spacetime(fromDb[0], tz).format('{nice-day} {time}'))
  //   console.log('off by: ', (changes.start - fromDb[0]) / 60 / 1000 / 60, 'hrs')
  // }
  // if (changes.end !== fromDb[1]) {
  //   console.log('\n--end--')
  //   console.log('have', spacetime(changes.end, tz).format('{nice-day} {time}'))
  //   console.log('want', spacetime(fromDb[1], tz).format('{nice-day} {time}'))
  //   console.log('off by: ', (changes.end - fromDb[1]) / 60 / 1000 / 60, 'hrs')
  // }
  return false
}


let tz = 'America/Los_Angeles'
// tz = 'America/Toronto'
// tz = 'Europe/Zaporozhye'
tz = 'Africa/Casablanca'
// tz = 'Europe/Sofia'
// tz = 'Asia/Hebron'
// tz = 'Australia/Adelaide'
// console.log(isCorrect(tz, 2022))


const doAll = function (year) {
  let good = 0
  let bad = 0
  Object.keys(zones).forEach(k => {
    if (zones[k].pattern) {
      if (isCorrect(k, year)) {
        good += 1
      } else {
        bad += 1
        // console.log(k)
      }
    }
  })
  console.log('good', good)
  console.log('bad', bad)
}
doAll(2022)