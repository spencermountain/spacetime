import timeFns from './01-time.ts'
import dateFns from './02-date.ts'
import yearFns from './03-year.ts'

const methods = {
  ...timeFns,
  ...dateFns,
  ...yearFns,
  //aliases
  milliseconds: timeFns.millisecond,
  seconds: timeFns.second,
  minutes: timeFns.minute,
  hours: timeFns.hour,
  hour24: timeFns.hour,
  h12: timeFns.hour12,
  h24: timeFns.hour,
  days: dateFns.day
}

export default methods
