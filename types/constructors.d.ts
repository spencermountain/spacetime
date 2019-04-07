import { Spacetime } from './types'

interface SpacetimeConstructorOptions {
  /** javascript dates use millisecond-epochs, instead of second-epochs, like some other languages. This is a common bug, and by default spacetime warns if you set an epoch within January 1970. to disable set to true */
  silent: boolean
}

interface SpacetimeConstructor {
  /**
   * @param date Javascript date object
   * @param timezone Optional timezone. If omitted uses the browser timezone.
   * @param options Options for silencing warnings.
   */
  (date: Date, timezone?: string, options?: SpacetimeConstructorOptions): Spacetime

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
}

interface SpacetimeStatic extends SpacetimeConstructor {
  /** now */
  now: () => Spacetime

  /** this morning */
  today: () => Spacetime

  /** tomorrow morning */
  tomorrow: () => Spacetime
}
