import type { I18n } from '../types/index.ts'

let shortMonths = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
]
let longMonths = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]

// month-name -> month-number
function buildMapping(): Record<string, number> {
  const obj: Record<string, number> = {
    sep: 8 //support this format
  }
  for (let i = 0; i < shortMonths.length; i++) {
    obj[shortMonths[i]] = i
  }
  for (let i = 0; i < longMonths.length; i++) {
    obj[longMonths[i]] = i
  }
  return obj
}

export function short(): string[] { return shortMonths }
export function long(): string[] { return longMonths }
export function mapping(): Record<string, number> { return buildMapping() }
export function set(i18n: I18n['months']): void {
  shortMonths = i18n.short || shortMonths
  longMonths = i18n.long || longMonths
}
