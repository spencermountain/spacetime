import Spacetime from './spacetime.ts'
import titleCase from './timezone/titleCase.ts'

// which timezones are currently between these two times-of-day?
const whereIts = (a: string, b?: string): string[] => {
  let start = new Spacetime(null)
  let end = new Spacetime(null)
  start = start.time(a)
  //if b is undefined, use as 'within one hour'
  if (b) {
    end = end.time(b)
  } else {
    end = start.add(59, 'minutes')
  }

  const startMinute = start.hour() * 60 + start.minute()
  const endMinute = end.hour() * 60 + end.minute()
  const tzs = Object.keys(start.timezones).filter((tz) => {
    if (tz.indexOf('/') === -1) {
      return false
    }
    const m = new Spacetime(null, tz)
    // skip names that resolve to another, like 'etc/zulu'
    if (m.tz !== tz) {
      return false
    }
    const minute = m.hour() * 60 + m.minute()
    //do 'calendar-compare' not real-time-compare
    if (!b && endMinute < startMinute) {
      return minute >= startMinute || minute <= endMinute
    }
    return minute >= startMinute && minute <= endMinute
  })
  return tzs.map(titleCase)
}
export default whereIts
