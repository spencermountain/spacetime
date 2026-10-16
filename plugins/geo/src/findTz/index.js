import tzlookup from '@photostructure/tz-lookup'
import coordinates from './_lib.js'

const findTz = function (geo, longitude) {
  const point = coordinates(geo, longitude)
  if (!point) {
    return this
  }
  return this.goto(tzlookup(...point))
}

export default findTz
