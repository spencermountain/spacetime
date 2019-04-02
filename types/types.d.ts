import { TimeUnit, Format } from "./constraints";

export interface SpacetimeMain {
  /* move to a new timezone, but at this same moment. Accepts an IANA code or abbreviation */
  goto: (target: string) => Spacetime;

  /* make a copy of this object, with no references to the original */
  clone: () => Spacetime;

  /* return a bunch of meta-data about your current timezone */
  timezone: () => TimezoneMeta;

  /* output nicely-formatted strings */
  format: (format: Format | string) => string | object;

  /* output formatted string using unix formatting code (yyyy.MM.dd h:mm a) */
  unixFmt: (format: string) => string;

  /* move to the first millisecond of the day, week, month, year, etc. */
  startOf: (unit: TimeUnit) => Spacetime;

  /* move to the last millisecond of the day, week, month, year, etc. */
  endOf: (unit: TimeUnit) => Spacetime;

  /* increment the time by a number and unit - like an hour, minute, day, or year */
  add: (value: number, unit: TimeUnit) => Spacetime;

  /* decrease the time by a number and unit - like an hour, minute, day, or year */
  subtract: (value: number, unit: TimeUnit) => Spacetime;

  /* go to the beginning of the next unit */
  next: (unit: TimeUnit) => Spacetime;

  /* go to the beginning of the previous unit */
  last: (unit: TimeUnit) => Spacetime;

  /* pass-in a spacetime object or date input and see if it takes-place after your spacetime date/time */
  isAfter: (other: Spacetime | Date) => Spacetime;

  /* pass-in a spacetime object or date input and see if it takes-place before your spacetime date/time */
  isBefore: (other: Spacetime | Date) => Spacetime;

  /* is this date on the exact same millisecond as another */
  isEqual: (other: Spacetime | Date) => boolean;

  /* detect if two date/times are the same day, week, or year, etc */
  isSame: (other: Spacetime | Date, unit: TimeUnit) => boolean;

  /* given a date amd a unit, count how many of them you'd need to make the dates equal */
  diff(value: Spacetime | ParsableDate, unit: TimeUnit): number;
}

/* The return types are not actually both number and Spacetime, but this aids in casting to the proper type */
export interface SpacetimeGetterSetters {
  /* set or return the current number of milliseconds (0-999) */
  millisecond: (value?: number) => number & Spacetime;

  /* set or return the current number of seconds (0-59) */
  second: (value?: number) => number & Spacetime;

  /* set or return the current number of minutes (0-59) */
  minute: (value?: number) => number & Spacetime;

  /* set or return the current hour, in 24 time (0-23). also accepts/parses '3pm' */
  hour: (value?: number | string) => number & Spacetime;

  /* set or return the day-number of the month (1- max31) */
  date: (value?: number) => number & Spacetime;

  /* set or return the zero-based month-number (0-11). Also accepts 'June', or 'oct'. */
  month: (value?: string) => number & Spacetime;

  /* set or return the 4-digit year as an integer */
  year: (value?: number) => number & Spacetime;

  /* set or return a formatted, 12-hour time, like '11:30pm' */
  time: (value?: string) => number & Spacetime;

  /* set or return the week-number of the year (1-52) */
  week: (value?: number) => number & Spacetime;

  /* set or return the fiscal-quarter (1-4) */
  quarter: (value?: number) => number & Spacetime;

  /* set or return the name of the season, spring/summer/fall/autumn/winter */
  season: (value?: string) => string & Spacetime;

  /* set or return the hour + minute in decimal form, so '3:30am' is 3.5 */
  hourFloat: (value?: number) => number & Spacetime;

  /* set or return the day of the week as an integer, starting on sunday (day-0). Also accepts names like 'wednesday', or 'thurs' */
  day: (value?: number | string) => number & Spacetime;

  /* set or return whether the time is am or pm */
  ampm: (value?: string) => string & Spacetime;

  /* set or return the general time-of-day, like 'afternoon' */
  dayTime: (value?: string) => string & Spacetime;

  /* set or return the current month as a string, like 'april' */
  monthName: (value?: string) => string & Spacetime;
}

export interface SpacetimeUtils {
  /* change to a new date */
  set(date: ParsableDate): Spacetime;

  /* does this time exist on the gregorian/javascript calendar? */
  isValid: () => boolean;

  /* pretty-print the date to the console, for nicer debugging */
  log: () => string;

  /* Between 0-1, how far the moment lands between the start and end of the day/week/month/year. */
  progress: () => Progress;

  /* is the current year a leap year? */
  leapYear: () => boolean;

  /* is daylight-savings-time activated right now, for this timezone? */
  inDST: () => boolean;

  /* does this timezone ever use daylight-savings */
  hasDST: () => boolean;

  /* the current, DST-aware time-difference from UTC, in hours */
  offset: () => number;

  /* checks if the current time is between 10pm and 8am */
  isAsleep: () => boolean;
}

export interface Spacetime
  extends SpacetimeMain,
    SpacetimeGetterSetters,
    SpacetimeUtils {
  d: Date;
  epoch: number;
  silent: boolean;
  tz: string;

  timezones: TimezoneSet;
}

export interface TimezoneMeta {
  change?: { start: string; back: string };
  current: { offset: number; isDST: boolean };
  default_offset: number;
  display: string;
  hasDst: boolean;
  hemisphere: string;
  name: string;
}

export interface Progress {
  [key: string]: number;
}

export interface TimezoneSet {
  [key: string]: {
    offset: number;
    hem: string;
    dst?: string;
  };
}

export type ParsableDate = Date | number | Array<number> | string;
