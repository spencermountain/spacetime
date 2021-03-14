const reduceTo = require('./_reduce')

//increment by this unit
const allTicks = function(start, end, unit) {
  let ticks = []
  start = start.add(1, unit)
  start = start.startOf(unit)
  while (start.isBefore(end)) {
    ticks.push(start)
    start = start.add(1, unit)
  }
  return ticks
}

const formatTicks = function(arr, fmt, start, end) {
  let delta = end.epoch - start.epoch
  return arr.map(s => {
    let percent = (s.epoch - start.epoch) / delta
    return {
      label: s.format(fmt),
      epoch: s.epoch,
      value: parseInt(percent * 1000, 10) / 1000
    }
  })
}

const methods = {
  centuries: (start, end, n) => {
    let ticks = allTicks(start, end, 'century')
    ticks = reduceTo(ticks, n)
    let fmt = '{year}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  decades: (start, end, n) => {
    let ticks = allTicks(start, end, 'decade')
    ticks = reduceTo(ticks, n)
    let fmt = '{year}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  years: (start, end, n) => {
    let ticks = allTicks(start, end, 'year')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {year-short}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  months: (start, end, n) => {
    let ticks = allTicks(start, end, 'month')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {date}'
    if (start.isSame(end, 'year') === false) {
      fmt = '{month-short} {year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  days: (start, end, n) => {
    let ticks = allTicks(start, end, 'day')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {date}'
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  hours: (start, end, n) => {
    let ticks = allTicks(start, end, 'hour')
    ticks = reduceTo(ticks, n)
    let fmt = '{time}'
    if (start.isSame(end, 'day') === false) {
      fmt = '{day-short} {hour}{ampm}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  minutes: (start, end, n) => {
    let ticks = allTicks(start, end, 'minute')
    ticks = reduceTo(ticks, n)
    let fmt = '{time}'
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  }
}
module.exports = methods
