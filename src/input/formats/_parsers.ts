import monthLengths from '../../data/monthLengths.ts'
import parseTime from './parseTime.ts'
import { isLeapYear } from '../../fns.ts'
import { mapping } from '../../data/months.ts'
import type { Spacetime, DateParts } from '../../types/index.ts'
const months = mapping()

/** a date-string parsing template */
export interface Parser {
  reg: RegExp
  parse: (s: Spacetime, m: RegExpMatchArray, givenTz?: string) => Spacetime
}

//given a month, return whether day number exists in it
const validate = (obj: DateParts): boolean => {
  //invalid values
  if (monthLengths.hasOwnProperty(obj.month) !== true || obj.date < 1) {
    return false
  }
  //support leap-year in february
  if (obj.month === 1) {
    if (isLeapYear(obj.year) && obj.date <= 29) {
      return true
    } else {
      return obj.date <= 28
    }
  }
  //is this date too-big for this month?
  const max = monthLengths[obj.month] || 0
  if (obj.date <= max) {
    return true
  }
  return false
}

const parseYear = (str: string = '', today?: DateParts): number => {
  str = str.trim()
  // Two-digit years share the '86 shorthand's century cutoff.
  if (/^'?[0-9][0-9]$/.test(str) === true) {
    const num = Number(str.replace(/'/, ''))
    if (num > 50) {
      return 1900 + num
    }
    return 2000 + num
  }
  let year = parseInt(str, 10)
  // use a given year from options.today
  if (!year && today) {
    year = today.year
  }
  // fallback to this year
  year = year || new Date().getFullYear()
  return year
}

const parseMonth = function (str: string): number {
  str = str.toLowerCase().trim()
  if (str === 'sept') {
    return months.sep
  }
  return months[str]
}

const parseTz = function (str: string): string {
  str = str.trim()
  str = str.replace(/[[\]]/g, '')
  return str
}

export { parseTime, parseYear, parseMonth, validate, parseTz }
