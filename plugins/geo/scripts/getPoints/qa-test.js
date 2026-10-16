import tzlookup from 'tz-lookup'
import points from '../../src/IANA-points.js'

Object.keys(points).forEach((k) => {
  const geo = points[k].split(',')
  const tz = tzlookup(geo[0], geo[1])
  if (k !== tz) {
    console.log(`want: ${k},   have: ${tz}`) // eslint-disable-line no-console
  }
})
