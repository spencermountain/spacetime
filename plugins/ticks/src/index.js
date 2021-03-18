const spacetime = require('spacetime')
const methods = require('./methods')
const version = require('../_version')

const chooseMethod = function(start, end, n = 6) {
  let diff = start.diff(end)
  if (diff.years > 300) {
    return methods.centuries(start, end, n)
  }
  if (diff.years > 30) {
    return methods.decades(start, end, n)
  }
  if (diff.years > 3) {
    return methods.years(start, end, n)
  }
  if (diff.months > 3) {
    return methods.months(start, end, n)
  }
  if (diff.days > 3) {
    return methods.days(start, end, n)
  }
  if (diff.hours > 3) {
    return methods.hours(start, end, n)
  }
  if (diff.minutes > 3) {
    return methods.minutes(start, end, n)
  }
  return methods.months(start, end, n)
}

//flip it around backwards
const reverseTicks = function(ticks) {
  ticks = ticks.map(o => {
    o.value = 1 - o.value
    return o
  })
  return ticks.reverse()
}

const spacetimeTicks = function(start, end, n = 6) {
  let reverse = false
  start = spacetime(start)
  end = spacetime(end)
  //reverse them, if necessary
  if (start.epoch > end.epoch) {
    reverse = true
    let tmp = start.epoch
    start.epoch = end.epoch
    end.epoch = tmp
  }
  // nudge first one back 1 minute
  if (start.time() === '12:00am') {
    start = start.minus(1, 'minute')
  }
  let ticks = chooseMethod(start, end, n)
  //support backwards ticks
  if (reverse === true) {
    ticks = reverseTicks(ticks)
  }
  return ticks
}
spacetimeTicks.version = version

module.exports = spacetimeTicks
