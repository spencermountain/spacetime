import Spacetime from './spacetime.js'
import config from './config.js'
import version from './_version.js'

const main = (input, tz) => new Spacetime(input, tz)

//some helper functions on the main method
main.now = (tz) => new Spacetime(config.now(), tz)

main.today = (tz) => new Spacetime(new Date().getTime(), tz).startOf('day')

main.plugin = function (plg) {
  if (plg.api) {
    Object.assign(Spacetime.prototype, plg.api)
  }
  if (plg.zones) {

  }
}
main.version = version

export default main