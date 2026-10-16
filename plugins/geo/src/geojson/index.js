import data from './packed.json' with { type: 'json' }
import indexData from '../_lib.js'
import unpack from './_lib.js'

const features = indexData(data)
const geojson = function () {
  const tz = this.timezone().name.toLowerCase()
  if (!Object.hasOwn(features, tz)) {
    return null
  }
  return unpack(features[tz])
}

export default geojson
