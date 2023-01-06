import patterns from '../zonefile/patterns.js'
import zones from '../zonefile/zonefile.2022.js'
import misc from '../zonefile/misc.js'
import calc from './calculate.js'
import { getStart } from './_lib/yearStart.js'

const hour = 1000 * 60 * -60

// calculate DST times, for this timezone
const getDst = function (tz, year) {
  let { pattern, offset } = zones[tz] || {}
  // allow ad-hoc dst settings
  if (misc.hasOwnProperty(pattern) && misc[pattern][String(year)]) {
    let [start, end] = misc[pattern][String(year)]
    return { start, end }
  }
  let obj = patterns[pattern]
  if (!obj) {
    return {}
  }
  let changes = []

  // get epoch for 01/01
  let yearStart = getStart(year)
  yearStart += (offset * hour)
  changes.push({
    epoch: yearStart,
    cal: {
      year,
      month: 0,
      date: 1,
      hour: 0,
      minute: 0,
    }
  })

  // get epoch for spring dst change
  let startEpoch = calc(obj.start, year, offset)
  changes.push({
    epoch: startEpoch - hour,
    cal: {
      year,
      month: obj.start.month,
      date: obj.start.num,
      hour: obj.start.hour,
      minute: 0,
    }
  })

  // get epoch for fall dst change
  let endEpoch = calc(obj.end, year, offset)
  changes.push({
    epoch: endEpoch,
    cal: {
      year,
      month: obj.end.month,
      date: obj.end.num,
      hour: obj.end.hour,
      minute: 0,
    }
  })
  return changes
}

export default getDst

// console.log(getDst('America/Toronto', 2023))