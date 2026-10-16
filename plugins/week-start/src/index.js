import version from './_version.js'
import { getWeekStart } from './input/weekStart.js'

const plugin = {
  weekStart: function (input) {
    return getWeekStart(input, this.tz)
  }
}

// Keep metadata out of spacetime.extend()'s method list.
Object.defineProperty(plugin, 'version', { value: version })

export default plugin
