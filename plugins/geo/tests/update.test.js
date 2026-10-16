import test from 'tape'
import { selectRelease, packCollection } from '../scripts/_lib.js'

const asset = { name: 'timezones-with-oceans.geojson.zip', browser_download_url: 'https://example.com/boundaries.zip' }

test('boundary releases have an explicit IANA version and ocean asset', (t) => {
  t.deepEqual(selectRelease({ tag_name: '2026e', assets: [asset] }), { tzdbVersion: '2026e', source: asset.browser_download_url })
  t.throws(() => selectRelease({ tag_name: 'latest', assets: [asset] }), /release/i)
  t.throws(() => selectRelease({ tag_name: '2026e', prerelease: true, assets: [asset] }), /release/i)
  t.throws(() => selectRelease({ tag_name: '2026e', assets: [] }), /asset/i)
  t.end()
})

test('boundary updates validate geometry and alias-aware coverage', (t) => {
  const feature = { type: 'Feature', properties: { tzid: 'America/Toronto' }, geometry: { type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 0]]] } }
  const collection = { type: 'FeatureCollection', features: [feature] }
  const options = { tolerance: 0.12, highQuality: true }
  t.ok(packCollection(collection, { 'canada/eastern': {} }, options)['america/toronto'], 'canonical geometry covers aliases')
  t.throws(() => packCollection(collection, { 'europe/paris': {} }, options), /coverage/i)
  t.throws(() => packCollection({ type: 'FeatureCollection', features: [] }, {}, options), /empty/i)
  t.throws(() => packCollection({ type: 'FeatureCollection', features: [{ ...feature, geometry: null }] }, {}, options), /geometry/i)
  t.end()
})
