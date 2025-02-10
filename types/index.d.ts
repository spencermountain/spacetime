import type { SpacetimeStatic } from './constructors.js'

declare const spacetime: SpacetimeStatic

// We need to use a single default export here so everything lines up with the actual imported object from JS
export default spacetime


export { SpacetimeConstructor, SpacetimeConstructorOptions, SpacetimeStatic } from './constructors.js'
export { Format, I18nOptions, TimeUnit } from './constraints.js'
export { Spacetime, Diff, ParsableDate, Progress, Since, TimezoneMeta, TimezoneSet } from './types.js'
