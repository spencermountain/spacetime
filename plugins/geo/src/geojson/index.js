import data from './data.json' with { type: 'json' }
import indexData from '../_lib.js'

const features = indexData(data)
const geojson = function () {
  const tz = this.timezone().name.toLowerCase()
  if (!Object.hasOwn(features, tz)) {
    return null
  }
  // Callers may edit geometry without changing subsequent lookups.
  return JSON.parse(JSON.stringify(features[tz]))
}

export default geojson
