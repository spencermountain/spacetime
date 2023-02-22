import getDay from '../../../compute/_lib/getDay.js'
import { parseDay } from '../../../parse/formats/units/index.js'
import { SECOND, MINUTE, HOUR, DAY, YEAR, LEAPYEAR } from '../../../compute/_lib/millis.js'
import add from './add.js'


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

const startOfDay = function (cal) {
  return Object.assign({}, cal, { hour: 0, minute: 0, second: 0, ms: 0 })
}
export default {

  // eg. 'tues'
  day: (input, cal, tz, fwd) => {
    let n = parseDay(input)
    if (n !== null) {
      let have = getDay(cal.year, cal.month, cal.date)
      let diff = n - have
      if (diff === 0) {
        return cal
      }
      // which direction
      if (fwd) {
        diff = diff < 0 ? diff += 7 : diff
        cal.date += diff // not correct!
      } else {
        diff = diff > 0 ? diff -= 7 : diff
        cal.date += diff // not correct!
      }
    }
    return cal
  },
  // week of the year
  week: (input, cal) => {
    cal = startOfDay(cal)
    console.log(cal)
    return cal
  },
  add: function (n, unit) {
    let epoch = roll(this.epoch, n, unit)
    return this
  },
  subtract: function (n, unit) {
    return this.add(n * -1, unit)
  }
}