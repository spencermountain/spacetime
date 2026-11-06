import type { Spacetime, SpacetimeInput, TimeUnit, GetSet } from './types/index.ts'

//git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
export const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
// unsurprisingly-nasty `typeof date` call
export const isArray = (input: unknown): input is unknown[] => Object.prototype.toString.call(input) === '[object Array]'
export const isObject = (input: unknown): input is Record<string, any> => Object.prototype.toString.call(input) === '[object Object]'
export const isBoolean = (input: unknown): input is boolean => Object.prototype.toString.call(input) === '[object Boolean]'
const isDate = (d: unknown): d is Date => Object.prototype.toString.call(d) === '[object Date]' && !isNaN((d as Date).valueOf())

export const zeroPad = (num: number | string, len = 2): string => {
  const pad = '0'
  const str = num + ''
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str
}

export const titleCase = (str: string): string => {
  if (!str) {
    return ''
  }
  return str[0].toUpperCase() + str.slice(1)
}

export const ordinal = (i: number): string => {
  const j = i % 10
  const k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

//strip 'st' off '1st'..
export const toCardinal = (input: number | string): number => {
  let str = String(input)
  str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1')
  return parseInt(str, 10)
}

//used mostly for cleanup of unit names, like 'months'
// (unknown units pass through unchanged; the caller warns or ignores them)
export const normalize = (str = ''): TimeUnit => {
  str = str.toLowerCase().trim()
  str = str.replace(/ies$/, 'y') //'centuries'
  str = str.replace(/s$/, '')
  str = str.replace(/-/g, '')
  if (str === 'day' || str === 'days') {
    return 'date'
  }
  if (str === 'min' || str === 'mins') {
    return 'minute'
  }
  return str as TimeUnit
}

export const getEpoch = (tmp: number | Date | Spacetime | { epoch: number }): number | null => {
  //support epoch
  if (typeof tmp === 'number') {
    return tmp
  }
  //suport date objects
  if (isDate(tmp)) {
    return tmp.getTime()
  }
  // support spacetime objects
  if (tmp.epoch || tmp.epoch === 0) {
    return tmp.epoch
  }
  return null
}

//make sure this input is a spacetime obj
export const beADate = (d: SpacetimeInput, s: Spacetime): Spacetime => {
  if (d instanceof Object && 'epoch' in d) {
    return d as Spacetime
  }
  return d == null ? s.clone().set() : s.clone().set(d)
}

/** the clock-unit getter/setters, for looking a method up by name */
export const unitKeys = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'] as const
export type UnitKey = typeof unitKeys[number]
export const isUnitKey = (k: string): k is UnitKey => (unitKeys as readonly string[]).includes(k)
export const getUnit = (s: Spacetime, unit: UnitKey): number => (s[unit] as GetSet<number, number | string>).call(s)
export const setUnit = (s: Spacetime, unit: UnitKey, value: number | string): Spacetime => (s[unit] as GetSet<number, number | string>).call(s, value)

export const formatTimezone = (offset: number, delimiter = ''): string => {
  const sign = offset > 0 ? '+' : '-'
  const absOffset = Math.abs(offset)
  const hours = zeroPad(Math.trunc(absOffset))
  const minutes = zeroPad((absOffset % 1) * 60)
  return `${sign}${hours}${delimiter}${minutes}`
}
