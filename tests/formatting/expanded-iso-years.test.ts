import test from 'tape'
import spacetime from '../_lib/index.ts'

test('ISO formatting signs and pads positive expanded years', (t) => {
  for (const year of [10000, 12345, 100000]) {
    const epoch = Date.UTC(year, 5, 1, 12, 34, 56, 789)
    const s = spacetime(epoch, 'UTC')
    const expected = new Date(epoch).toISOString()
    t.equal(s.format('iso-year'), expected.split('-')[0], `${year} signed year`)
    t.equal(s.iso(), expected, `${year} native ISO agreement`)
    t.equal(Date.parse(s.iso()), epoch, `${year} native parser round trip`)
    t.equal(s.format('iso-full'), `${expected}[UTC]`, `${year} annotated ISO`)
  }
  t.end()
})

test('ordinary and negative ISO years retain their existing form', (t) => {
  for (const year of [-12345, -1, 0, 99, 2024, 9999]) {
    const date = new Date(0)
    date.setUTCFullYear(year, 0, 1)
    t.equal(spacetime(date.getTime(), 'UTC').iso(), date.toISOString(), String(year))
  }
  t.end()
})
