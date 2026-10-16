import ms from '../../data/milliseconds.js'

const precision = {
  second: 'millisecond',
  minute: 'second',
  quarterhour: 'minute',
  hour: 'minute',
  date: 'hour',
  week: 'day',
  month: 'day',
  quarter: 'day',
  season: 'day',
  year: 'day'
}
const years = { decade: 10, century: 100 }

const addFraction = (s, num, unit) => {
  if (Object.hasOwn(years, unit)) {
    return s.add(num * years[unit], 'year')
  }
  if (!Object.hasOwn(precision, unit)) {
    return null
  }
  let duration = ms[unit]
  if (unit === 'month' || unit === 'quarter' || unit === 'season' || unit === 'year') {
    // Keep calendar arithmetic for the whole part; only estimate the remainder.
    s = s.add(Math.trunc(num), unit)
    num %= 1
    duration = s.add(1, unit).epoch - s.epoch
    if (unit === 'month') {
      duration = 28 * ms.day
    }
  } else if (unit === 'quarterhour') {
    duration = 15 * ms.minute
  }
  s.epoch += num * duration
  const subunit = precision[unit]
  if (subunit === 'millisecond') {
    s.epoch = Math.round(s.epoch)
    return s
  }
  // Round against local boundaries, including days with a DST transition.
  const lower = s.startOf(subunit)
  const upper = lower.add(1, subunit)
  if (s.epoch - lower.epoch <= upper.epoch - s.epoch) {
    return lower
  }
  return upper
}

export default addFraction
