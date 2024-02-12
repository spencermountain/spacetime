import type { SpacetimeStatic } from './constructors'

declare const spacetime: SpacetimeStatic

// We need to use a single default export here so everything lines up with the actual imported object from JS
export default spacetime

export { SpacetimeConstructor, SpacetimeConstructorOptions, SpacetimeStatic } from './constructors'
export { Format, I18nOptions, TimeUnit } from './constraints'
export { Spacetime, Diff, ParsableDate, Progress, Since, TimezoneMeta, TimezoneSet } from './types'
