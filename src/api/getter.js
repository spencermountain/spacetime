import getCal from '../compute/cal/index.js'
import getDay from '../compute/_lib/getDay.js'
import config from '../config.js'

let getter = {
  year: (epoch, tz) => getCal(epoch, tz).year,
  month: (epoch, tz) => getCal(epoch, tz).month,
  date: (epoch, tz) => getCal(epoch, tz).date,
  hour: (epoch, tz) => getCal(epoch, tz).hour,
  minute: (epoch, tz) => getCal(epoch, tz).minute,
  second: (epoch, tz) => getCal(epoch, tz).second,
  day: (epoch, tz) => {
    let { year, month, date } = getCal(epoch, tz)
    return getDay(year, month, date)
  },
}
// am/pm
getter.ampm = (epoch, tz) => getter.hour(epoch, tz) < 12 ? 'am' : 'pm'
// wednesday/friday
getter.dayName = (epoch, tz) => {
  return config.days.longForm[getter.day(epoch, tz)]
}
export default getter