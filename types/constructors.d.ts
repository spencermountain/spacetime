import { Spacetime } from "./types";

interface SpacetimeConstructorOptions {
  /* javascript dates use millisecond-epochs, instead of second-epochs, like some other languages. This is a common bug, and by default spacetime warns if you set an epoch within January 1970. to disable set to true */
  silent: boolean;
}

interface SpacetimeConstructor {
  /* date */
  (
    date: Date,
    timezone?: string,
    options?: SpacetimeConstructorOptions
  ): Spacetime;

  /* epoch */
  (
    epoch: number,
    timezone?: string,
    options?: SpacetimeConstructorOptions
  ): Spacetime;

  /* array [yyyy, m, d] (zero-based months, 1-based days) */
  (
    arr: Array<string>,
    timezone?: string,
    options?: SpacetimeConstructorOptions
  ): Spacetime;

  /* iso */
  (
    iso: string,
    timezone?: string,
    options?: SpacetimeConstructorOptions
  ): Spacetime;
}

interface SpacetimeStatic extends SpacetimeConstructor {
  /* now */
  now: () => Spacetime;

  /* this morning */
  today: () => Spacetime;

  /* tomorrow morning */
  tomorrow: () => Spacetime;
}
