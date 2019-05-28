import { SpacetimeStatic } from './constructors'

declare const spacetime: SpacetimeStatic

// We need to use a single default export here so everything lines up with the actual imported object from JS
export default spacetime

export * from './constructors'
export * from './constraints'
export * from './types'
