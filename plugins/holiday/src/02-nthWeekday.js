import spacetime from 'spacetime'
import calendar from './holidays/calendar-holidays.js'

const calendarDates = (str, normal, year, tz, lookup) => {
  const rule = calendar[str] ?? calendar[normal]
  if (!rule) {
    return null
  }
  if (rule.after) {
    const base = lookup(rule.after, year, tz)
    return base ? base.add(rule.days, 'day') : null
  }
  const start = spacetime.now(tz).year(year).startOf('year')
  if (rule.before) {
    const anchor = start.month(rule.before[0]).date(rule.before[1])
    let result = anchor.day(rule.weekday)
    if (result.epoch >= anchor.epoch) {
      result = result.subtract(1, 'week')
    }
    return result
  }
  const [nth, weekday, month] = rule
  let anchor = start.month(month).startOf('month')
  if (nth < 0) {
    anchor = anchor.endOf('month').startOf('day')
    let result = anchor.day(weekday)
    if (result.epoch > anchor.epoch) {
      result = result.subtract(1, 'week')
    }
    return result.add(nth + 1, 'week')
  }
  let result = anchor.day(weekday)
  if (result.epoch < anchor.epoch) {
    result = result.add(1, 'week')
  }
  return result.add(nth - 1, 'week')
}

export default calendarDates
