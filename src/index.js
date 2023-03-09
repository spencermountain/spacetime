import Spacetime from './spacetime.js'
import version from './_version.js'
import world from './world.js'

const lib = (input, tz) => new Spacetime(input, tz)
lib.world = world

lib.plugin = function (plg) {
  Object.assign(lib.world.zones, plg.zones || {})
  Object.assign(lib.world.config, plg.config || {})
  Object.assign(lib.world.model, plg.model || {})
  Object.assign(Spacetime.prototype, plg.api || {})
  Object.assign(lib.world.methods, plg.methods || {})
}
lib.version = version

//some helper functions on the main method
lib.now = (tz) => new Spacetime(null, tz)
lib.today = (tz) => lib.now(tz).startOf('day')
lib.tomorrow = (tz) => lib.today(tz).add(1, 'day')
lib.yesterday = (tz) => lib.today(tz).minus(1, 'day')

export default lib