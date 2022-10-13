import patterns from '../data/patterns.js'
// import calc from './calc.js'
import calc from './pure-calc.js'

import zones from '../data/zonefile.2022.js'

const hour = 1000 * 60 * -60

const getDst = function (tz, year) {
  let { pattern, offset } = zones[tz]
  let obj = patterns[pattern]
  if (!obj) {
    return {}
  }
  // obj.end.hour += 2
  let changes = {
    start: calc(obj.start, year, offset),
    end: calc(obj.end, year, offset),
  }
  // changes.end -= hour
  changes.start -= hour
  return changes
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
// isCorrect(tz, 2022)


export default getDst