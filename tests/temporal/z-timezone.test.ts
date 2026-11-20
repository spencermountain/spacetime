import test from 'tape'
import spacetime from '../../src/temporal/index.ts'

const options = { skip: !globalThis.Temporal }

test("Temporal entry: 'Z' is a utc timezone", options, (t) => {
  const want = '2024-07-15T12:00:00+00:00[UTC]'
  t.equal(spacetime('2024-07-15T12:00:00', 'Z').format('iso-full'), want, 'Z')
  t.equal(spacetime('2024-07-15T12:00:00', 'z').format('iso-full'), want, 'z')
  t.equal(spacetime('2024-07-15T12:00:00Z[Z]').format('iso-full'), want, 'Z[Z]')
  t.equal(spacetime('2024-07-15T12:00:00+00:00[z]').format('iso-full'), want, '+00:00[z]')
  const s = spacetime('2024-07-15T12:00:00', 'America/Toronto')
  t.equal(s.goto('Z').format('iso-full'), '2024-07-15T16:00:00+00:00[UTC]', 'goto')
  t.equal(s.timezone('Z').format('iso-full'), want, 'timezone')
  t.equal(spacetime({ year: 2024, month: 6, date: 15, hour: 12, timezone: 'Z' }).tz, 'UTC', 'object input')
  t.end()
})

test('Temporal entry: every name for utc is UTC', options, (t) => {
  const arr = ['UTC', 'utc', 'Zulu', 'Etc/UTC', 'Etc/Zulu', 'UCT', 'Etc/UCT', 'Universal', 'Etc/Universal']
  arr.forEach((tz) => {
    t.equal(spacetime('2024-07-15T12:00:00', tz).tz, 'UTC', tz)
    t.equal(spacetime(`2024-07-15T12:00:00Z[${tz}]`).tz, 'UTC', `[${tz}]`)
  })
  t.equal(spacetime('2024-07-15T12:00:00', 'GMT').tz, 'GMT', 'gmt is a different zone')
  t.equal(spacetime('2024-01-01T16:20:00Z', 'America/Toronto').tz, 'UTC', 'trailing Z')
  t.end()
})

test('Temporal entry: a zero offset has one name', options, (t) => {
  const arr = ['+0h', '-0h', 'utc+0', 'gmt-0', '+00:00', '-00:00']
  arr.forEach((tz) => {
    t.equal(spacetime('2024-07-15T12:00:00', tz).tz, '+00:00', `tz '${tz}'`)
  })
  const strs = ['+00:00', '-00:00', '+0000', '+00']
  strs.forEach((offset) => {
    t.equal(spacetime('2024-07-15T12:00:00' + offset).tz, '+00:00', `string '${offset}'`)
  })
  t.end()
})

test('Temporal entry: -00:00 and +00:00 resolve the same', options, (t) => {
  const d = '2024-01-01T16:20:00'
  const same = (fn: (o: string) => { tz: string; format: (fmt: string) => string }, label: string) => {
    const a = fn('+')
    const b = fn('-')
    t.equal(b.tz, a.tz, label + ' tz')
    t.equal(b.format('iso-full'), a.format('iso-full'), label + ' iso-full')
  }
  same((o: string) => spacetime(d + o + '00:00'), 'hh:mm string')
  same((o: string) => spacetime(d + o + '0000'), 'hhmm string')
  same((o: string) => spacetime(d + o + '00'), 'hh string')
  same((o: string) => spacetime(d + o + '00:00[America/Toronto]'), 'string with iana')
  same((o: string) => spacetime('Jan 1 2024 16:20:00 GMT' + o + '0000'), 'date string')
  same((o: string) => spacetime(d, o + '00:00'), 'timezone arg')
  same((o: string) => spacetime(d, o + '0h'), 'hour arg')
  same((o: string) => spacetime(d, 'America/Toronto').goto(o + '00:00'), 'goto')
  same((o: string) => spacetime(d, 'America/Toronto').timezone(o + '00:00'), 'timezone()')
  same((o: string) => spacetime(1704126000000, o + '00:00'), 'epoch')
  same((o: string) => spacetime({ year: 2024, month: 0, date: 1, hour: 16, minute: 20, second: 0, millisecond: 0, timezone: o + '00:00' }), 'object')
  t.end()
})
