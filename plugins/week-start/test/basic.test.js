import test from 'tape'
import spacetime from '../../../src/index.js'
import weekStartPlugin from '../src/index.js'

spacetime.extend(weekStartPlugin)

test('uses the timezone of the spacetime object', t => {
  t.deepEqual(spacetime.now('Europe/Berlin').weekStart(), { day: 'monday', country: 'germany' })
  t.deepEqual(spacetime.now('America/Toronto').weekStart(), { day: 'sunday', country: 'canada' })
  t.deepEqual(spacetime.now('Asia/Tehran').weekStart(), { day: 'saturday', country: 'iran' })
  t.end()
})

test('general timezones return a location', t => {
  t.deepEqual(spacetime.now('Etc/Zulu').weekStart(), { day: 'monday', location: 'zulu' })
  t.end()
})

test('falsy or unknown input falls back to the timezone', t => {
  const s = spacetime.now('America/Toronto')
  t.deepEqual(s.weekStart(null), { day: 'sunday', country: 'canada' })
  t.deepEqual(s.weekStart(''), { day: 'sunday', country: 'canada' })
  t.deepEqual(s.weekStart(12), { day: 'sunday', country: 'canada' })
  t.deepEqual(s.weekStart('xyzxyz'), { day: 'sunday', country: 'canada' })
  t.end()
})

test('a country name wins over the timezone', t => {
  const s = spacetime.now('Europe/Berlin')
  t.equal(s.weekStart('canada').day, 'sunday')
  t.equal(s.weekStart('canada').country, 'canada')
  t.equal(s.weekStart('iran').day, 'saturday')
  t.end()
})

test('partial country names match', t => {
  const s = spacetime.now('America/Toronto')
  t.equal(s.weekStart('united arab emirates').day, 'sunday')
  t.equal(s.weekStart('emirates').country, 'united arab emirates')
  t.end()
})

test('country name can be in lower case, upper case or camel case', t => {
  const s = spacetime.now('America/Toronto')
  t.equal(s.weekStart('cana').day, 'sunday')
  t.equal(s.weekStart('nada').country, 'grenada')
  t.notEqual(s.weekStart('nada').country, 'canada')
  // finds first occourance of string 'nada' in JSON
  t.equal(s.weekStart('CANADA').day, 'sunday')
  t.equal(s.weekStart('Canada').country, 'canada')
  // it's located in array under key "monday" for
  // grenada and after that appears located in
  // canada under key "sunday"
  t.equal(s.weekStart('CaNa').day, 'sunday')
  t.equal(s.weekStart('nAdA').country, 'grenada')
  t.notEqual(s.weekStart('nAdA').country, 'canada')
  t.end()
})
