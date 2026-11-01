// Library-wide types, shared across src/. (The public API declarations live in /types at the repo root.)
import type Spacetime from '../spacetime.ts'
import type { TimeUnit } from '../../types/constraints.js'
import type { ParsableDate, DateFields } from '../../types/types.js'
export type { Spacetime, TimeUnit }

/** anything the constructor (or .set()) accepts. null/undefined mean 'now' */
export type SpacetimeInput = ParsableDate | null | undefined

/** calendar fields, as produced by a parser or given as options.today */
export interface DateParts {
  year?: number
  month?: number
  date?: number
  hour?: number
  minute?: number
  second?: number
  millisecond?: number
  timezone?: string
}


export interface Options {
  silent?: boolean
  /** favour british interpretation of 02/02/2018, etc */
  dmy?: boolean
  british?: boolean
  /** 0=sunday, 1=monday .. */
  weekStart?: number
  /** reference 'today' date, for testing */
  today?: DateFields
}

/** strings used for output, swappable via `s.i18n({...})`. Every field is optional; unset ones keep their current value */
export interface I18n {
  days?: { short?: string[]; long?: string[] }
  months?: { short?: string[]; long?: string[] }
  ampm?: { am?: string; pm?: string }
  useTitleCase?: boolean
  distance?: {
    past?: string
    future?: string
    present?: string
    now?: string
    almost?: string
    over?: string
    pastDistance?: (value: string) => string
    futureDistance?: (value: string) => string
  }
  units?: Record<string, string>
}

/** one tz-database entry: utc offset in hours (july), hemisphere, and dst change-dates like '03/08:02->11/01:02' */
export interface Zone {
  offset: number
  hem: string
  dst?: string
}
/** the tz database, keyed by lowercase iana id, eg 'america/denver' */
export type TimezoneSet = Record<string, Zone>

/** what s.timezone() returns */
export interface TimezoneMeta {
  name: string
  hasDst: boolean
  default_offset: number
  hemisphere: 'North' | 'South'
  change?: { start: string; back: string }
  current: { offset: number; isDST: boolean }
}

/** a getter/setter method: with no argument it reads a value, with one it returns a changed copy */
export interface GetSet<T, In = T> {
  (this: Spacetime): T
  (this: Spacetime, value: In, goFwd?: boolean): Spacetime
}
