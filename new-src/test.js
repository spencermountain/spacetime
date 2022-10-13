import patterns from './data/patterns.js'
// import calc from './calc.js'
import calc from './calc-pure.js'
import tzdb from './tzdb/index.js'
import zones from './data/zonefile.2022.js'

const hour = 1000 * 60 * -60

const getDst = function (tz, year) {
  let { pattern, offset } = zones[tz]
  let obj = patterns[pattern]
  // obj.end.hour += 2
  let changes = {
    start: calc(obj.start, year, offset),
    end: calc(obj.end, year, offset),
  }
  changes.end -= hour
  return changes
}

const isCorrect = function (tz, year) {
  let changes = getDst(tz, year)
  if (!tzdb[tz]) {
    console.log(tz)
    return true
  }
  let fromDb = tzdb[tz][year]
  if (changes.start === fromDb[0] && changes.end === fromDb[1]) {
    return true
  }
  console.log(tz, changes)
  if (changes.start !== fromDb[0]) {
    console.log('--start--')
    console.log('have', changes.start)
    console.log('want', fromDb[0])
    console.log('off by: ', (changes.start - fromDb[0]) / 60 / 1000 / 60, 'hrs')
  }
  if (changes.end !== fromDb[1]) {
    // console.log('--end--')
    // console.log('have', changes.end)
    // console.log('want', fromDb[1])
    // console.log(changes.end - fromDb[1])
  }
  return false
}

const tz = 'America/Los_Angeles'
// const tz = 'Europe/Sofia'
// const tz = 'Asia/Hebron'
// const tz = 'Australia/Adelaide'
const year = 2024
isCorrect(tz, year)

// let good = 0
// let bad = 0
// Object.keys(zones).forEach(k => {
//   if (zones[k].pattern) {
//     if (isCorrect(k, year)) {
//       good += 1
//     } else {
//       bad += 1
//     }
//   }
// })
// console.log(good)
// console.log(bad)
