import { Spacetime } from "./types";

interface SpacetimeConstructor {
  /* date */
  (date: Date, timezone?: string): Spacetime;

  /* epoch */
  (epoch: number, timezone?: string): Spacetime;

  /* array [yyyy, m, d] (zero-based months, 1-based days) */
  (arr: Array<string>, timezone?: string): Spacetime;

  /* iso */
  (iso: string, timezone?: string): Spacetime;
}

interface SpacetimeStatic extends SpacetimeConstructor {
  /* now */
  now: () => Spacetime;

  /* this morning */
  today: () => Spacetime;

  /* tomorrow morning */
  tomorrow: () => Spacetime;
}
