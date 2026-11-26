import test from 'tape'
import spacetime from '../_lib/index.ts'

test('JSON timezone setters resolve IANA names and aliases before setting fields', (t) => {
  const original = spacetime('2024-06-15T12:30:00Z', 'UTC')
  for (const timezone of ['America/New_York', 'new york', 'Etc/UTC', 'Asia/Kolkata']) {
    const moved = original.json({ timezone })
    t.equal(moved.tz, original.goto(timezone).tz, `${timezone} without calendar fields`)
    t.equal(moved.format('iso'), original.goto(timezone).format('iso'), `${timezone} local clock`)
    const expected = original.goto(timezone).hour(9)
    const actual = original.json({ timezone, hour: 9 })
    t.equal(actual.tz, expected.tz, `${timezone} canonical zone`)
    t.equal(actual.epoch, expected.epoch, `${timezone} local hour`)
  }
  t.equal(original.format('iso'), '2024-06-15T12:30:00.000Z', 'source is unchanged')
  t.end()
})
