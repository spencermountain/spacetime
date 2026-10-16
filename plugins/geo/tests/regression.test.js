import test from 'tape'
import spacetime from '../../../src/index.js'
import geo from '../src/index.js'

spacetime.extend(geo)

test('coordinate formats preserve the instant and original instance', (t) => {
  const s = spacetime('2024-06-01', 'America/Toronto')
  const inputs = [
    [48.8566, 2.3522],
    '48.8566, 2.3522',
    '48.8566/2.3522',
    { lat: 48.8566, lng: 2.3522 },
    { latitude: 48.8566, longitude: 2.3522 },
    { lat: 48.8566, lon: 2.3522 },
    { lat: 48.8566, long: 2.3522 }
  ]
  inputs.forEach((input) => {
    const result = s.in(input)
    t.equal(result.timezone().name, 'Europe/Paris', 'finds Paris')
    t.equal(result.epoch, s.epoch, 'preserves instant')
    t.notEqual(result, s, 'returns a new instance')
  })
  t.equal(s.in(48.8566, 2.3522).timezone().name, 'Europe/Paris', 'two arguments')
  t.equal(s.timezone().name, 'America/Toronto', 'original timezone unchanged')
  t.end()
})

test('zero coordinates and invalid coordinates', (t) => {
  const s = spacetime('2024-06-01', 'America/Toronto')
  ;[[0, 0], [0, 30], [51, 0]].forEach(([lat, lng]) => {
    t.equal(s.in({ lat, lng }).tz, s.in([lat, lng]).tz, 'object preserves zero')
  })
  const invalid = [
    undefined, null, {}, [], [0], [NaN, 0], [0, Infinity],
    ['', ''], [null, null], [true, false], [91, 0], [0, -181],
    'Paris', '', ' , ', '48,2,3', '48north,2',
    { lat: 0 }, { lat: '', lng: 0 }, { lat: NaN, lng: 0 }
  ]
  invalid.forEach((input) => {
    t.equal(s.in(input), s, 'invalid input consistently leaves instance unchanged')
  })
  t.end()
})

test('GeoJSON lookup and isolation', (t) => {
  const s = spacetime('2024-06-01', 'Europe/Paris')
  const first = s.geojson()
  t.equal(first?.type, 'Feature', 'Paris has a feature')
  t.ok(first?.geometry?.coordinates.length, 'feature has coordinates')
  if (first) {
    first.geometry.coordinates.length = 0
    t.ok(s.geojson().geometry.coordinates.length, 'returned geometry is independent')
  }
  t.ok(spacetime.now('America/Toronto').geojson(), 'Toronto has geometry')
  t.deepEqual(spacetime.now('UTC').geojson(), spacetime.now('Etc/UTC').geojson(), 'UTC alias')
  t.equal(geo.geojson.call({ timezone: () => ({ name: 'Missing/Zone' }) }), null, 'missing geometry returns null')
  t.end()
})

test('representative points support aliases', (t) => {
  t.deepEqual(spacetime.now('Japan').point(), spacetime.now('Asia/Tokyo').point(), 'Japan alias')
  const point = spacetime.now('UTC').point()
  t.ok(Number.isFinite(point.lat) && Number.isFinite(point.lng), 'UTC has a representative point')
  const s = spacetime.now('Europe/Paris')
  const first = s.point()
  first.lat = -90
  t.notEqual(s.point().lat, -90, 'points are independent')
  t.end()
})

test('current lookup data resolves newer timezone names', (t) => {
  const s = spacetime('2026-06-01', 'UTC')
  t.equal(s.in([-45.57, -72.07]).timezone().name, 'America/Coyhaique', 'Aysen region')
  t.equal(s.in([50.45, 30.52]).timezone().name, 'Europe/Kyiv', 'Kyiv')
  t.end()
})
