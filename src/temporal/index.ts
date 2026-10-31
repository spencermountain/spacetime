import Spacetime from './spacetime.ts'
import version from '../_version.ts'
import type { SpacetimeInput, Options } from '../types/index.ts'

const create = (input?: SpacetimeInput, tz?: string, options?: Options) => new Spacetime(input, tz, options)
const now = (tz?: string, options?: Options) => create(null, tz, options)

const extend = (methods: Record<string, any> = {}) => {
  Object.assign(Spacetime.prototype, methods)
  return spacetime // eslint-disable-line no-use-before-define
}

const spacetime = Object.assign(create, {
  now,
  today: (tz?: string, options?: Options) => now(tz, options).startOf('day'),
  tomorrow: (tz?: string, options?: Options) => now(tz, options).startOf('day').add(1, 'day'),
  yesterday: (tz?: string, options?: Options) => now(tz, options).startOf('day').subtract(1, 'day'),
  fromUnixSeconds: (seconds: number, tz?: string, options?: Options) => create(seconds * 1000, tz, options),
  extend,
  plugin: extend,
  version
})

export default spacetime
