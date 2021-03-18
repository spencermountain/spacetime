import { Spacetime, ParsableDate, TimezoneSet } from './types'

export interface SpacetimeConstructorOptions {
  /** javascript dates use millisecond-epochs, instead of second-epochs, like some other languages. This is a common bug, and by default spacetime warns if you set an epoch within January 1970. to disable set to true */
  silent?: boolean

  /** the day number, between 0-6, that the week starts on. (Sunday is 0) */
  weekStart?: number

  /** pass true to change parsing behaviour to dd/mm/yyyy. By default American interpretation will be used. */
  dmy?: boolean
}

export interface SpacetimeConstructor {
  /**
   * @param date Javascript date object
   * @param timezone Optional timezone. If omitted uses the browser timezone.
   * @param options Options for silencing warnings.
   */
  (date?: Date, timezone?: string, options?: SpacetimeConstructorOptions): Spacetime

  /**
   * @param epoch Timestamp in **milliseconds**. If you are getting a date in 1970, you are likely using seconds.
   * @param timezone Optional timezone. If omitted uses the browser timezone.
   * @param options Options for silencing warnings.
   */
  (epoch: number, timezone?: string, options?: SpacetimeConstructorOptions): Spacetime

  /**
   * @param arr Date values in an array such as [yyyy, m, d].
   *
   * ```typescript
   * let d = spacetime([2011, 1, 15]);
   * d.format('nice-year'); // "Feb 15th, 2011"
   * ```
   * @param timezone Optional timezone. If omitted uses the browser timezone.
   * @param options Options for silencing warnings.
   */
  (arr: Array<number>, timezone?: string, options?: SpacetimeConstructorOptions): Spacetime

  /**
   * @param obj Date as a key-value object. ex {month:'june', year:2019}
   * @param timezone Optional timezone. If omitted uses the browser timezone.
   * @param options Options for silencing warnings.
   */
  (
    obj: { [unit: string]: string | number },
    timezone?: string,
    options?: SpacetimeConstructorOptions
  ): Spacetime

  /**
   * @param iso Date as an iso string. ex '2017-04-03T08:00:00'
   * @param timezone Optional timezone. If omitted uses the browser timezone.
   * @param options Options for silencing warnings.
   */
  (iso: string, timezone?: string, options?: SpacetimeConstructorOptions): Spacetime

  /**
   * @param parsableDate a parsable date like object
   * @param timezone Optional timezone. If omitted uses the browser timezone.
   * @param options Options for silencing warnings.
   */
  (parsableDate: ParsableDate, timezone?: string, options?: SpacetimeConstructorOptions): Spacetime
}

export interface SpacetimeStatic extends SpacetimeConstructor {
  /** set as the current time */
  now: (timezone?: string, options?: SpacetimeConstructorOptions) => Spacetime

  /** set as this morning */
  today: (timezone?: string, options?: SpacetimeConstructorOptions) => Spacetime

  /** set as tomorrow morning */
  tomorrow: (timezone?: string, options?: SpacetimeConstructorOptions) => Spacetime

  /** set as yesterday morning */
  yesterday: (timezone?: string, options?: SpacetimeConstructorOptions) => Spacetime

  /** Extend Spacetime with a custom function/object.  */
  extend: (extension: { [key: string]: any } | {}) => SpacetimeStatic

  /** get a list of current timezones and their offsets  */
  timezones: () => TimezoneSet

  /** list timezones by their time */
  whereIts: (a: string, b?: string) => string[]

  /** set as earliest-possible date */
  min: (timezone?: string, options?: SpacetimeConstructorOptions) => Spacetime

  /** set as furthest-possible future date */
  max: (timezone?: string, options?: SpacetimeConstructorOptions) => Spacetime

}
