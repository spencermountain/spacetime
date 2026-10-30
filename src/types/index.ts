

export type SpacetimeInput = string | number | Date | object | string[] | number[]

export interface Options {
  silent?: boolean
  /** favour british interpretation of 02/02/2018, etc */
  dmy?: boolean
  british?: boolean
  /** 0=sunday, 1=monday .. */
  weekStart?: number
  /** reference 'today' date, for testing */
  today?: object
}
