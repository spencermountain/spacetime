import type { Spacetime } from '../types/index.ts'

const warn = (s: Spacetime, message: string): void => {
  if (s.silent === false) {
    console.warn(`Warn: ${message}`) // eslint-disable-line no-console
  }
}

// Spacetime's month and year getters always describe the ISO calendar.
const isoCalendar = (s: Spacetime, value: any) => {
  if (value.calendarId !== 'iso8601') {
    warn(s, `Temporal calendar "${value.calendarId}" converted to iso8601`)
    return value.withCalendar('iso8601')
  }
  return value
}

const incomplete = (input: unknown, T: any): boolean => input instanceof T.PlainTime || input instanceof T.PlainYearMonth ||
  input instanceof T.PlainMonthDay || input instanceof T.Duration

export { warn, isoCalendar, incomplete }
