import Spacetime from './spacetime.ts'
import whereIts from './whereIts.ts'
import version from './_version.ts'
import { tzdbVersion } from '../zonefile/_build.js'
import type { SpacetimeInput, Options } from './types/index.ts'

const create = (input?: SpacetimeInput, tz?: string, options?: Options) => new Spacetime(input, tz, options)

// set all properties of a given 'today' object
const setToday = function (s: Spacetime): Spacetime {
  const today = s._today || {}
  Object.keys(today).forEach((k) => {
    s = s[k](today[k])
  })
  return s
}

const now = (tz?: string, options?: Options) => {
  let s = new Spacetime(new Date().getTime(), tz, options)
  s = setToday(s)
  return s
}

// add methods to every instance (returns the main method, for chaining)
const extend = function (obj: Record<string, any> = {}) {
  Object.keys(obj).forEach((k) => {
    // plugins should add methods, not replace existing ones
    // (re-registering the identical plugin is a harmless no-op)
    if (k in Spacetime.prototype && Spacetime.prototype[k] !== obj[k]) {
      console.warn(`Spacetime Warning: .extend() is overriding the existing method '${k}'`) // eslint-disable-line no-console
    }
    Spacetime.prototype[k] = obj[k]
  })
  return main // eslint-disable-line no-use-before-define
}

//the main method, with some helper functions on it
const main = Object.assign(create, {
  now,
  today: (tz?: string, options?: Options) => now(tz, options).startOf('day'),
  tomorrow: (tz?: string, options?: Options) => now(tz, options).add(1, 'day').startOf('day'),
  yesterday: (tz?: string, options?: Options) => now(tz, options).subtract(1, 'day').startOf('day'),
  fromUnixSeconds: (secs: number, tz?: string, options?: Options) => new Spacetime(secs * 1000, tz, options),
  extend,
  plugin: extend,
  timezones: () => new Spacetime().timezones,
  max: (tz?: string, options?: Options) => {
    const s = new Spacetime(null, tz, options)
    s.epoch = 8640000000000000
    return s
  },
  min: (tz?: string, options?: Options) => {
    const s = new Spacetime(null, tz, options)
    s.epoch = -8640000000000000
    return s
  },
  //find tz by time
  whereIts,
  version,
  tzdbVersion
})

export default main
