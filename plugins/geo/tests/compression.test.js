import test from 'tape'
import pack from '../scripts/pack-geojson.js'
import unpack from '../src/geojson/_lib.js'

const ring = [[-179.9999, -89.123456], [0, 1], [179.9999, 89.123456], [-179.9999, -89.123456]]
const hole = [[1, 1], [2, 1], [1, 2], [1, 1]]

test('polygon compression rounds coordinates and preserves metadata', (t) => {
  const shapes = [
    { type: 'Polygon', coordinates: [ring, hole] },
    { type: 'MultiPolygon', coordinates: [[ring, hole], [hole]] }
  ]
  shapes.forEach((geometry) => {
    const feature = { type: 'Feature', id: 'example', properties: { tzid: 'Example/Zone', nested: { value: 1 } }, geometry }
    const original = JSON.stringify(feature)
    const expected = JSON.parse(original, (key, value) => {
      return typeof value === 'number' ? Math.round(value * 1e4) / 1e4 : value
    })
    const packed = pack(feature)
    t.equal(JSON.stringify(feature), original, 'packing leaves input unchanged')
    t.deepEqual(unpack(packed), expected, 'four decimal places including holes and metadata')
    const result = unpack(packed)
    result.properties.nested.value = 2
    result.geometry.coordinates.length = 0
    t.deepEqual(unpack(packed), expected, 'each decoded feature is independent')
  })
  t.end()
})

test('packing rejects invalid coordinates and unsupported geometry', (t) => {
  const feature = (geometry) => ({ type: 'Feature', properties: {}, geometry })
  t.throws(() => pack(feature({ type: 'Point', coordinates: [0, 0] })), /geometry/i)
  t.throws(() => pack(feature({ type: 'Polygon', coordinates: [[[NaN, 0]]] })), /coordinate/i)
  t.throws(() => pack(feature({ type: 'Polygon', coordinates: [[[0, 0, 1]]] })), /coordinate/i)
  t.end()
})

test('rounding omits collapsed islands and holes', (t) => {
  const tiny = [[0, 0], [0.00001, 0], [0, 0.00001], [0, 0]]
  const feature = { type: 'Feature', properties: {}, geometry: { type: 'MultiPolygon', coordinates: [[hole, tiny], [tiny]] } }
  t.deepEqual(unpack(pack(feature)).geometry.coordinates, [[hole]], 'keeps surviving polygon without collapsed hole')
  feature.geometry.coordinates = [[tiny]]
  t.throws(() => pack(feature), /collapsed/i, 'rejects loss of the entire feature')
  t.end()
})
