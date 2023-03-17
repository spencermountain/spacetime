import validate from './validate.js'
import walk from './walk.js'

const NEW_YEAR = {
  month: 1,
  date: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
}

// compare two cal objects
const isAfter = function (a, b) {
  const units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
  for (let i = 0; i < units.length; i += 1) {
    let unit = units[i]
    if (a[unit] > b[unit]) {
      return true
    }
    if (a[unit] < b[unit]) {
      return false
    }
  }
  //it's the same
  return true
}

const getEpoch = function (cal, tz, world) {
  const { yearStart, dstChanges } = world.methods
  // set secure defaults
  cal = validate(cal, world)

  // set our cal to Jan 1 of this year
  let epoch = yearStart(cal.year, tz, world)
  let have = Object.assign({}, NEW_YEAR, { year: cal.year })

  // consult any DST changes this year
  let changes = dstChanges(tz, cal.year, world).reverse()
  let change = changes.find(c => isAfter(cal, c.cal))
  if (change) {
    epoch = change.epoch
    have = Object.assign({}, NEW_YEAR, change.cal, { year: cal.year })
  }
  // step-forward, by milliseconds
  epoch = walk(epoch, have, cal, world)

  return epoch
}
export default getEpoch