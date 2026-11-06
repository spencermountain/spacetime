import { setUnit } from '../fns.ts'
import { parseMonth } from './formats/_parsers.ts'
import type { Spacetime, DateParts } from '../types/index.ts'
import type { DateFields } from '../../types/types.js'

const defaults: DateParts = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1
}
const units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'] as const

//support [2016, 03, 01] format
const parseArray = (s: Spacetime, arr: Array<number | string>, today: DateParts): Spacetime => {
  if (arr.length === 0) {
    return s
  }
  for (let i = 0; i < units.length; i++) {
    let num = arr[i]
    if (num == null) {
      num = today[units[i]]
    }
    if (num == null) {
      num = defaults[units[i]]
    }
    if (num == null) {
      num = 0
    }
    s = setUnit(s, units[i], num)
  }
  return s
}

//support {year:2016, month:3} format
const parseObject = (s: Spacetime, obj: DateParts): Spacetime => {
  if (Object.keys(obj).length === 0) {
    return s
  }
  obj = Object.assign({}, defaults, obj)
  if (obj.timezone) {
    s.tz = obj.timezone
  }
  for (let i = 0; i < units.length; i++) {
    const unit = units[i]
    if (obj[unit] !== undefined) {
      s = setUnit(s, unit, obj[unit])
    }
  }
  return s
}

// options.today as numbers (month names become indexes), the way parsers expect it
const toParts = (today: DateFields = {}): DateParts => {
  const out: Record<string, number> = {}
  units.forEach((unit) => {
    const value = today[unit]
    if (value === undefined || value === null) {
      return
    }
    if (unit === 'month' && typeof value === 'string' && isNaN(Number(value))) {
      const month = parseMonth(value)
      if (month !== undefined) {
        out.month = month
      }
      return
    }
    out[unit] = Number(value)
  })
  return out
}

// this may seem like an arbitrary number, but it's 'within jan 1970'
// this is only really ambiguous until 2054 or so
const parseNumber = function (s: Spacetime, input: number): Spacetime {
  const minimumEpoch = 2500000000
  // if the given epoch is really small, they've probably given seconds and not milliseconds
  // anything below this number is likely (but not necessarily) a mistaken input.
  if (input > 0 && input < minimumEpoch && s.silent === false) {
    console.warn('  - Warning: You are setting the date to January 1970.') // eslint-disable-line no-console
    console.warn('       -   did input seconds instead of milliseconds?') // eslint-disable-line no-console
  }
  s.epoch = input
  return s
}

export { toParts }
export default {
  parseArray,
  parseObject,
  parseNumber
}
