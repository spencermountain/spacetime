import version from './_version.js'
import find from './findTz/index.js'
import point from './point/index.js'
import geojson from './geojson/index.js'

const plugin = {
  in: find,
  point: point,
  geojson: geojson,
}

// Keep metadata out of spacetime.extend()'s method list.
Object.defineProperty(plugin, 'version', { value: version })

export default plugin
