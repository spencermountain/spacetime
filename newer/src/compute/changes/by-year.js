import patterns from '../../../zonefile/patterns.js'
import zones from '../../../zonefile/zonefile.2022.js'
import misc from '../../../zonefile/misc.js'
import calc from './calculate.js'
import { getStart } from '../_lib/yearStart.js'
import { HOUR } from '../_lib/millis.js'

// calculate DST times, for this timezone
const getDst = function (tz, year) {
  let { dst, offset, change } = zones[tz] || {}
  change = change || 1
  // allow ad-hoc dst settings
  // if (misc.hasOwnProperty(dst) && misc[dst][String(year)]) {
  //   let [start, end] = misc[dst][String(year)]
  //   return { start, end }
  // }

  let changes = []

  let obj = patterns[dst]
  if (!obj) {
    return changes
  }
  // get epoch for spring dst change
  let res = calc(obj.start, year, offset)
  changes.push({
    epoch: res.epoch,//- (HOUR * change),
    cal: {
      year,
      month: res.month,
      date: res.date,
      hour: obj.start.hour,
      minute: 0,
    },
    offset: offset + change
  })

  // get epoch for fall dst change
  res = calc(obj.end, year, offset)
  changes.push({
    epoch: res.epoch,
    cal: {
      year,
      month: res.month,
      date: res.date,
      hour: obj.end.hour,
      minute: 0,
    },
    offset
  })
  return changes
}

export default getDst

console.log(getDst('America/Toronto', 2023))