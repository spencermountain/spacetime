import Spacetime from './spacetime.js'
import version from '../_version.js'

const spacetime = (input, tz, options) => new Spacetime(input, tz, options)
spacetime.now = (tz, options) => spacetime(null, tz, options)
spacetime.today = (tz, options) => spacetime.now(tz, options).startOf('day')
spacetime.tomorrow = (tz, options) => spacetime.today(tz, options).add(1, 'day')
spacetime.yesterday = (tz, options) => spacetime.today(tz, options).subtract(1, 'day')
spacetime.fromUnixSeconds = (seconds, tz, options) => spacetime(seconds * 1000, tz, options)
spacetime.extend = (methods = {}) => {
  Object.assign(Spacetime.prototype, methods)
  return spacetime
}
spacetime.plugin = spacetime.extend
spacetime.version = version

export default spacetime
