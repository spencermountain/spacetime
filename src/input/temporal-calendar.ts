// these helpers only read `.silent`, so either Spacetime class can use them
type Warnable = { silent: boolean }

const warn = (s: Warnable, message: string): void => {
  if (s.silent === false) {
    console.warn(`Warn: ${message}`) // eslint-disable-line no-console
  }
}

// Spacetime's month and year getters always describe the ISO calendar.
// anything with a calendar: ZonedDateTime, PlainDate, PlainDateTime..
type WithCalendar = Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainDateTime

const isoCalendar = <T extends WithCalendar>(s: Warnable, value: T): T => {
  if (value.calendarId !== 'iso8601') {
    warn(s, `Temporal calendar "${value.calendarId}" converted to iso8601`)
    return value.withCalendar('iso8601') as T
  }
  return value
}

const incomplete = (input: unknown, T: typeof Temporal): boolean => input instanceof T.PlainTime || input instanceof T.PlainYearMonth ||
  input instanceof T.PlainMonthDay || input instanceof T.Duration

export { warn, isoCalendar, incomplete }
