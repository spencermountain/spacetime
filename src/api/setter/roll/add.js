import getCal from '../../../compute/cal/index.js'
import getEpoch from '../../../compute/epoch/index.js'
import { SECOND, MINUTE, HOUR, DAY, YEAR, LEAPYEAR } from '../../../compute/_lib/millis.js'

const mapping = {
  ms: 1,
  milli: 1,
  millis: 1,
  millisecond: 1,
  milliseconds: 1,
  second: SECOND,
  seconds: SECOND,
  h: HOUR,
  hs: HOUR,
  hour: HOUR,
  hours: HOUR,

  // date: DAY,
  // dates: DAY,
  // day: DAY,
  // days: DAY,

}

// don't pop into the time, sweep through all times
const add = function (epoch, n, unit) {
  if (n === 0 || !unit) {
    return epoch
  }
  unit = unit.trim().toLowerCase()
  if (!mapping.hasOwnProperty(unit)) {
    console.error(`Spacetime: no recognized unit: '${unit}'`)
    return epoch
  }
  // how many milliseconds are we adding?
  let ms = mapping[unit]


  epoch += ms * n
  return epoch
}
export default add