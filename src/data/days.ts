import type { I18n } from '../types/index.ts'

let shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
let longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export function short(): string[] { return shortDays }
export function long(): string[] { return longDays }
export function set(i18n: I18n['days']): void {
  shortDays = i18n.short || shortDays
  longDays = i18n.long || longDays
}
export const aliases: Record<string, number> = {
  mo: 1,
  tu: 2,
  we: 3,
  th: 4,
  fr: 5,
  sa: 6,
  su: 7,
  tues: 2,
  weds: 3,
  wedn: 3,
  thur: 4,
  thurs: 4
}
