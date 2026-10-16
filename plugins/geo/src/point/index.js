import data from './IANA-points.js'
import indexData from '../_lib.js'

const points = indexData(data)
const point = function () {
  const tz = this.timezone().name.toLowerCase()
  if (!Object.hasOwn(points, tz)) {
    return {}
  }
  const [lat, lng] = points[tz].split(',').map(Number)
  return { lat, lng }
}

export default point
