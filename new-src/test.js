import patterns from './data/patterns.js'
// import calc from './calc.js'
import calc from './pure-calc.js'
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
  // changes.end -= hour
  changes.start -= hour
  return changes
}

const isCorrect = function (tz, year) {
  let changes = getDst(tz, year)
  if (!tzdb[tz] || !tzdb[tz][year]) {
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
    console.log('have', new Date(changes.start))
    console.log('want', new Date(fromDb[0]))
    console.log('off by: ', (changes.start - fromDb[0]) / 60 / 1000 / 60, 'hrs')
  }
  if (changes.end !== fromDb[1]) {
    console.log('--end--')
    console.log('have', new Date(changes.end))
    console.log('want', new Date(fromDb[1]))
    console.log('off by: ', (changes.end - fromDb[1]) / 60 / 1000 / 60, 'hrs')
  }
  return false
}

let tz = ''
tz = 'America/Los_Angeles'
tz = 'America/Toronto'
tz = 'Europe/Zaporozhye'
// tz = 'Europe/Sofia'
// tz = 'Asia/Hebron'
// tz = 'Australia/Adelaide'
// const year = 2023
// for (let i = 2021; i < 2024; i += 1) {
//   console.log(i)
//   isCorrect(tz, i)
// }
isCorrect(tz, 2022)

let year = 2022
let good = 0
let bad = 0
Object.keys(zones).forEach(k => {
  if (zones[k].pattern) {
    if (isCorrect(k, year)) {
      good += 1
    } else {
      bad += 1
    }
  }
})
console.log(good)
console.log(bad)
