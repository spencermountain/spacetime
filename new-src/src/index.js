import patterns from '../data/patterns.js'
import calc from './pure-calc.js'
import zones from '../data/zonefile.2022.js'

const hour = 1000 * 60 * -60

const getDst = function (tz, year) {
  let { pattern, offset } = zones[tz]
  let obj = patterns[pattern]
  if (!obj) {
    return {}
  }
  let changes = {
    start: calc(obj.start, year, offset),
    end: calc(obj.end, year, offset),
  }
  changes.start -= hour
  return changes
}

export default getDst