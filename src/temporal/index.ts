import Spacetime from './spacetime.ts'
import version from '../_version.ts'
import type { Input, Options, Timezone } from '../../types/temporal-types.js'

const create = (input?: Input, tz?: Timezone, options?: Options) => new Spacetime(input, tz, options)
const now = (tz?: Timezone, options?: Options) => create(null, tz, options)

const extend = (methods: Record<string, any> = {}) => {
  Object.assign(Spacetime.prototype, methods)
  return spacetime // eslint-disable-line no-use-before-define
}

const spacetime = Object.assign(create, {
  now,
  today: (tz?: Timezone, options?: Options) => now(tz, options).startOf('day'),
  tomorrow: (tz?: Timezone, options?: Options) => now(tz, options).startOf('day').add(1, 'day'),
  yesterday: (tz?: Timezone, options?: Options) => now(tz, options).startOf('day').subtract(1, 'day'),
  fromUnixSeconds: (seconds: number, tz?: Timezone, options?: Options) => create(seconds * 1000, tz, options),
  extend,
  plugin: extend,
  version
})

export default spacetime
