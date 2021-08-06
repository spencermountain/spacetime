import { TimeUnit, Format } from './constraints'

/** a date/timezone object */
export interface Spacetime {
  /**
   * @deprecated use toNativeDate. This is an implementation detail that was not intended for external use
   * @returns the date as a native date object
   */
  d: Date

  /** @returns epoch in milliseconds */
  epoch: number

  /** @returns whether warnings are enabled */
  silent: boolean

  /** @returns the timezone tz database name, eg, 'america/denver'  */
  tz: string

  /** @returns the tz database nameset  */
  timezones: TimezoneSet

  /** move to a new timezone, but at this same moment. Accepts an IANA code or abbreviation */
  goto: (target: string | null) => Spacetime

  /** @returns a copy of this object, with no references to the original */
  clone: () => Spacetime

  /**
   * @deprecated use toNativeDate()
   * @returns the native Date object at the same epoch
   */
  toLocalDate(): Date

  /** @returns the native Date object at the same epoch */
  toNativeDate(): Date

  /** @returns a bunch of meta-data about your current timezone */
  timezone: () => TimezoneMeta

  /** output nicely-formatted strings */
  format: (format: Format) => string

  /** output formatted string using unix formatting code (yyyy.MM.dd h:mm a) */
  unixFmt: (format: string) => string

  /** move to the first millisecond of the day, week, month, year, etc. */
  startOf: (unit: TimeUnit) => Spacetime

  /** move to the last millisecond of the day, week, month, year, etc. */
  endOf: (unit: TimeUnit) => Spacetime

  /** increment the time by a number and unit - like an hour, minute, day, or year */
  add: (value: number, unit: TimeUnit) => Spacetime

  /** decrease the time by a number and unit - like an hour, minute, day, or year */
  subtract: (value: number, unit: TimeUnit) => Spacetime

  /** go to the beginning of the next unit */
  next: (unit: TimeUnit) => Spacetime

  /** round to either current, or +1 of this unit */
  nearest: (unit: TimeUnit) => Spacetime

  /** round to either current, or +1 of this unit */
  round: (unit: TimeUnit) => Spacetime

  /** list all dates up to a certain time */
  every: (unit: Spacetime | string | TimeUnit, end: Spacetime | string | TimeUnit) => Spacetime[]

  /** list all dates up to a certain time */
  each: (unit: TimeUnit, end: Spacetime | string) => Spacetime[]

  /** go to the beginning of the previous unit */
  last: (unit: TimeUnit) => Spacetime

  /** pass-in a spacetime object or date input and see if it takes-place after your spacetime date/time */
  isAfter: (date: Spacetime | Date) => boolean

  /** pass-in a spacetime object or date input and see if it takes-place before your spacetime date/time */
  isBefore: (date: Spacetime | Date) => boolean

  /** is this date on the exact same millisecond as another */
  isEqual: (date: Spacetime | Date) => boolean

  /** is this date between these start and end dates? */
  isBetween: (start: Spacetime | Date, end: Spacetime | Date, isInclusive?: boolean) => boolean

  /** detect if two date/times are the same day, week, or year, etc */
  isSame: (
    date: Spacetime | Date | TimeUnit,
    unit: Spacetime | Date | TimeUnit,
    tzSensitive?: boolean
  ) => boolean

  /** given a date and a unit, count how many of them you'd need to make the dates equal */
  diff(value: Spacetime | ParsableDate, unit: TimeUnit): number

  /** given a date, count how many of various units to make the dates equal */
  diff(value: Spacetime | ParsableDate): Diff

  /** create the human-readable diff between the two dates */
  since(value: Spacetime | ParsableDate): Since

  /** create the human-readable diff between the two dates */
  from(value: Spacetime | ParsableDate): Since

  /** create the human-readable diff between now and the given date */
  fromNow(value: Spacetime | ParsableDate): Since

  /** change to a new date */
  set(date: ParsableDate): Spacetime

  /** does this time exist on the gregorian/javascript calendar? */
  isValid: () => boolean

  /** which century is it? */
  century: () => number

  /** which decade is it? */
  decade: () => number

  /** pretty-print the date to the console, for nicer debugging */
  log: () => string

  /** pretty-print the full-date to the console, for nice debugging */
  logYear: () => string

  /** return all date units as a key-value map */
  json: () => string

  /** Between 0-1, how far the moment lands between the start and end of the day/week/month/year. */
  progress: (unit?: string) => Progress

  /** is the current year a leap year? */
  leapYear: () => boolean

  /** is daylight-savings-time activated right now, for this timezone? */
  isDST: () => boolean

  /** is daylight-savings-time activated right now, for this timezone? */
  inDST: () => boolean

  /** does this timezone ever use daylight-savings */
  hasDST: () => boolean

  /** the current, DST-aware time-difference from UTC, in hours */
  offset: () => number

  /** what hemisphere is it?  */
  hemisphere: () => string

  /** checks if the current time is between 8am and 10pm */
  isAwake: () => boolean

  /** checks if the current time is between 10pm and 8am */
  isAsleep: () => boolean

  /** get the current number of milliseconds (0-999) */
  millisecond(): number
  /** set the current number of milliseconds (0-999) */
  millisecond(value: number): Spacetime

  /** get the current number of seconds (0-59) */
  second(): number
  /** set the current number of seconds (0-59) */
  second(value: number, goForward?: boolean): Spacetime

  /** get the current number of minutes (0-59) */
  minute(): number
  /** set the current number of minutes (0-59) */
  minute(value: number, goForward?: boolean): Spacetime

  /** get the current hour, in 24 time (0-23). */
  hour(): number
  /** set the current hour, in 24 time (0-23). also accepts/parses '3pm' */
  hour(value: number | string, goForward?: boolean): Spacetime

  /** get the day-number of the month (1- max31) */
  date(): number
  /** set the day-number of the month (1- max31) */
  date(value: number, goForward?: boolean): Spacetime

  /** get the zero-based month-number (0-11). */
  month(): number
  /** set the zero-based month-number (0-11). Also accepts 'June', or 'oct'. */
  month(value: string | number, goForward?: boolean): Spacetime

  /** get the 4-digit year as an integer */
  year(): number
  /** set the 4-digit year as an integer */
  year(value: number): Spacetime

  /** get a formatted, 12-hour time, like '11:30pm' */
  time(): number
  /** set a formatted, 12-hour time, like '11:30pm' */
  time(value: string, goForward?: boolean): Spacetime

  /** get the week-number of the year (1-52) */
  week(): number
  /** set the week-number of the year (1-52) */
  week(value: number, goForward?: boolean): Spacetime

  /** get the fiscal-quarter (1-4) */
  quarter(): number
  /** set the fiscal-quarter (1-4) */
  quarter(value: number, goForward?: boolean): Spacetime

  /** get the name of the season, spring/summer/fall/autumn/winter */
  season(): string
  /** set the name of the season, spring/summer/fall/autumn/winter */
  season(value: string, goForward?: boolean): Spacetime

  /** get the hour + minute in decimal form, so '3:30am' is 3.5 */
  hourFloat(): number
  /** set the hour + minute in decimal form, so '3:30am' is 3.5 */
  hourFloat(value: number, goForward?: boolean): Spacetime

  /** get the day of the week as an integer, starting on sunday (day-0) */
  day(): number
  /** set the day of the week as an integer, starting on sunday (day-0). Also accepts names like 'wednesday', or 'thurs' */
  day(value: number | string, goForward?: boolean): Spacetime

  /** get the day of the week as lower-case string */
  dayName(): string
  /** set the day of the week */
  dayName(value: string, goForward?: boolean): Spacetime

  /** get whether the time is am or pm */
  ampm(): string
  /** set whether the time is am or pm */
  ampm(value: string, goForward?: boolean): Spacetime

  /** get the general time-of-day, like 'afternoon' */
  dayTime(): string
  /** set the general time-of-day, like 'afternoon' */
  dayTime(value: string, goForward?: boolean): Spacetime

  /** get the current month as a string, like 'april' */
  monthName(): string
  /** set the current month as a string, like 'april' */
  monthName(value: string, goForward?: boolean): Spacetime

  /** the day number, between 0-6, that the week starts on. (Sunday is 0).  Also accepts 'sunday' */
  weekStart(value: number | string): Spacetime

  /** returns the amount of days the current month has (December => 31, June => 30, ...) */
  daysInMonth: () => number
}

export interface TimezoneMeta {
  change?: { start: string; back: string }
  current: { offset: number; isDST: boolean }
  default_offset: number
  display: string
  hasDst: boolean
  hemisphere: string
  name: string
}

export interface Progress {
  /** Progress of value from 0-1 */
  day: number
  /** Progress of value from 0-1 */
  hour: number
  /** Progress of value from 0-1 */
  minute: number
  /** Progress of value from 0-1 */
  month: number
  /** Progress of value from 0-1 */
  quarter: number
  /** Progress of value from 0-1 */
  quarterHour: number
  /** Progress of value from 0-1 */
  season: number
  /** Progress of value from 0-1 */
  week: number
  /** Progress of value from 0-1 */
  year: number
}

export interface Diff {
  days: number
  hours: number
  milliseconds: number
  minutes: number
  months: number
  seconds: number
  weeks: number
  years: number
}

export interface Since {
  rounded: string
  qualified: string
  precise: string
  diff: Diff
}

/** set where the key is tz database name in lowercase, eg, 'america/denver' */
export interface TimezoneSet {
  [key: string]: {
    offset: number
    hem: string
    dst?: string
  }
}

export type ParsableDate = Date | number | Array<number> | string
