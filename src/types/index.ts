// Library-wide types, shared across src/. (The public API declarations live in /types at the repo root.)
import type Spacetime from '../spacetime.ts'
export type { Spacetime }

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

/** anything the constructor accepts: epoch, Date, '2020-01-01', [2020, 0, 1], {year: 2020}, another spacetime, a Temporal value.. */
export type SpacetimeInput = number | string | Date | Array<number | string> | DateParts | Spacetime | object | null | undefined

export interface Options {
  silent?: boolean
  /** favour british interpretation of 02/02/2018, etc */
  dmy?: boolean
  british?: boolean
  /** 0=sunday, 1=monday .. */
  weekStart?: number
  /** reference 'today' date, for testing */
  today?: DateParts
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
