import type { SpacetimeStatic } from './constructors'
import type * as constructors from './constructors'
import type * as constraints from './constraints'
import type * as types from './types'
import type * as interop from './temporal-interop'

declare const spacetime: SpacetimeStatic

// `export =` matches the CommonJS build's `module.exports`. The namespace merge below
// re-exports the type names, so `import { type Spacetime } from 'spacetime'` works from CommonJS too.
declare namespace spacetime {
  export type SpacetimeConstructor = constructors.SpacetimeConstructor
  export type SpacetimeConstructorOptions = constructors.SpacetimeConstructorOptions
  export type SpacetimeStatic = constructors.SpacetimeStatic
  export type Format = constraints.Format
  export type I18nOptions = constraints.I18nOptions
  export type TimeUnit = constraints.TimeUnit
  export type Spacetime = types.Spacetime
  export type Diff = types.Diff
  export type ParsableDate = types.ParsableDate
  export type Progress = types.Progress
  export type Since = types.Since
  export type TimezoneMeta = types.TimezoneMeta
  export type TimezoneSet = types.TimezoneSet
  export type TemporalInput = interop.TemporalInput
  export type TemporalResult = interop.TemporalResult
}

export = spacetime
