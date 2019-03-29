import { TimeUnit, Format } from "./constraints";

export interface SpacetimeMain {
  /* move to a new timezone, but at this same moment. Accepts an IANA code or abbreviation */
  goto: (target: string) => Spacetime;

  /* make a copy of this object, with no references to the original */
  clone: () => Spacetime;

  /* return a bunch of meta-data about your current timezone */
  timezone: () => Timezone;

  /* output nicely-formatted strings */
  format: (format: Format) => string | object;

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
  diff: (value: number, unit: TimeUnit) => number;
}

export interface Spacetime extends SpacetimeMain {}

export interface Timezone {}
