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
