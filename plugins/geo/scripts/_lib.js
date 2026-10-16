import { simplify } from '@turf/simplify'
import indexData from '../src/_lib.js'
import pack from './pack-geojson.js'

const selectRelease = (release) => {
  if (!/^\d{4}[a-z]+$/.test(release.tag_name) || release.draft || release.prerelease) {
    throw new Error('Expected a stable IANA boundary release')
  }
  const asset = release.assets.find((item) => item.name === 'timezones-with-oceans.geojson.zip')
  if (!asset?.browser_download_url) {
    throw new Error('Boundary release is missing the ocean GeoJSON asset')
  }
  return { tzdbVersion: release.tag_name, source: asset.browser_download_url }
}

const packCollection = (collection, previous, options) => {
  if (collection.type !== 'FeatureCollection' || !collection.features?.length) {
    throw new Error('Invalid or empty boundary collection')
  }
  const combined = {}
  collection.features.forEach((feature) => {
    const tz = feature.properties?.tzid
    const geometry = feature.geometry
    if (feature.type !== 'Feature' || typeof tz !== 'string' || !tz || !['Polygon', 'MultiPolygon'].includes(geometry?.type) || !geometry.coordinates?.length) {
      throw new Error(`Invalid timezone geometry: ${tz}`)
    }
    const key = tz.toLowerCase()
    if (Object.hasOwn(combined, key)) {
      throw new Error(`Duplicate timezone geometry: ${tz}`)
    }
    combined[key] = pack(simplify(feature, options))
  })
  const available = indexData(combined)
  const missing = Object.keys(previous).filter((tz) => !Object.hasOwn(available, tz.toLowerCase()))
  if (missing.length) {
    throw new Error(`Timezone coverage decreased; missing: ${missing.join(', ')}`)
  }
  return combined
}

export { selectRelease, packCollection }
