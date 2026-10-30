// @ts-nocheck
import timeFns from './01-time.ts'
import dateFns from './02-date.ts'
import yearFns from './03-year.ts'

const methods = Object.assign({}, timeFns, dateFns, yearFns)

//aliases
methods.milliseconds = methods.millisecond
methods.seconds = methods.second
methods.minutes = methods.minute
methods.hours = methods.hour
methods.hour24 = methods.hour
methods.h12 = methods.hour12
methods.h24 = methods.hour24
methods.days = methods.day

export default methods
