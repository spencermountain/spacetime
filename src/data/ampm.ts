import type { I18n } from '../types/index.ts'

let morning = 'am'
let evening = 'pm'

export function am(): string { return morning }
export function pm(): string { return evening }
export function set(i18n: I18n['ampm']): void {
  morning = i18n.am || morning
  evening = i18n.pm || evening
}
