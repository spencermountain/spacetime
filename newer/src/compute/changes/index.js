import patterns from '../../../zonefile/patterns.js'
import zones from '../../../zonefile/zonefile.2022.js'
import calc from './calculate.js'

let memo = {}

// calculate DST times, for this timezone
const getDst = function (tz, year) {
  // try and calculate each tz+year pair only once
  if (memo.hasOwnProperty(tz) && memo[tz].hasOwnProperty(year)) {
    return memo[tz][year]
  }
  memo[tz] = memo[tz] || {}

  let { dst, offset, change, hem } = zones[tz] || {}
  change = change || 1

  let changes = []

  let obj = patterns[dst]
  // if it has no dst..
  if (!obj) {
    memo[tz][year] = []
    return changes
  }
  // get epoch for spring dst change
  let res = calc(obj.start, year, offset)
  let delta = hem === 'n' ? change : 0
  changes.push({
    epoch: res.epoch,//- (HOUR * change),
    cal: {
      year,
      month: res.month,
      date: res.date,
      hour: obj.start.hour,
      minute: 0,
    },
    delta,
    offset: offset + delta
  })

  // get epoch for fall dst change
  res = calc(obj.end, year, offset)
  delta = hem === 's' ? change : 0
  changes.push({
    epoch: res.epoch,
    cal: {
      year,
      month: res.month,
      date: res.date,
      hour: obj.end.hour,
      minute: 0,
    },
    delta,
    offset: offset + delta
  })

  // store it for next time
  memo[tz][year] = changes
  return changes
}

export default getDst

// console.log(getDst('America/Toronto', 2023))
// console.log(getDst('Australia/Adelaide', 2023))