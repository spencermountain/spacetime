import getCal from '../compute/cal/index.js'

export default {
  year: (epoch, tz) => getCal(epoch, tz).year,
  month: (epoch, tz) => getCal(epoch, tz).month,
  date: (epoch, tz) => getCal(epoch, tz).date,
  hour: (epoch, tz) => getCal(epoch, tz).hour,
  minute: (epoch, tz) => getCal(epoch, tz).minute,
  second: (epoch, tz) => getCal(epoch, tz).second,
  ampm: (epoch, tz) => {
    let hour = getCal(epoch, tz).hour
    return hour < 12 ? 'am' : 'pm'
  },
}