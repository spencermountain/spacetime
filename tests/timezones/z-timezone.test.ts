import test from 'tape'
import spacetime from '../_lib/index.ts'

test("'Z' is a utc timezone", (t) => {
  const utc = spacetime('2024-07-15T12:00:00', 'UTC')
  const arr = ['Z', 'z', ' Z ']
  arr.forEach((tz) => {
    const s = spacetime('2024-07-15T12:00:00', tz)
    t.equal(s.timezone().name, 'UTC', `'${tz}' name`)
    t.equal(s.epoch, utc.epoch, `'${tz}' epoch`)
  })
  t.end()
})

test("goto and set 'Z'", (t) => {
  const s = spacetime('2024-07-15T12:00:00', 'America/Toronto')
  t.equal(s.goto('Z').format('iso-full'), '2024-07-15T16:00:00.000Z[UTC]', 'goto')
  t.equal(s.timezone('Z').format('iso-full'), '2024-07-15T12:00:00.000Z[UTC]', 'timezone')
  const obj = spacetime({ year: 2024, month: 6, date: 15, hour: 12, timezone: 'Z' })
  t.equal(obj.timezone().name, 'UTC', 'object input')
  t.end()
})

test("parse '[Z]' annotation", (t) => {
  const want = '2024-07-15T12:00:00.000Z[UTC]'
  t.equal(spacetime('2024-07-15T12:00:00Z[Z]').format('iso-full'), want, 'Z[Z]')
  t.equal(spacetime('2024-07-15T12:00:00+00:00[Z]').format('iso-full'), want, '+00:00[Z]')
  t.end()
})

test('every name for utc is UTC', (t) => {
  const arr = ['UTC', 'utc', 'Zulu', 'Etc/UTC', 'Etc/Zulu', 'UCT', 'Etc/UCT', 'Universal', 'Etc/Universal']
  arr.forEach((tz) => {
    t.equal(spacetime('2024-07-15T12:00:00', tz).timezone().name, 'UTC', tz)
    t.equal(spacetime(`2024-07-15T12:00:00Z[${tz}]`).timezone().name, 'UTC', `[${tz}]`)
  })
  // gmt is a different zone
  t.equal(spacetime('2024-07-15T12:00:00', 'GMT').timezone().name, 'Etc/GMT', 'GMT')
  t.end()
})

test("a 'Z' string is utc", (t) => {
  const s = spacetime('2024-01-01T16:20:00Z')
  t.equal(s.timezone().name, 'UTC', 'trailing Z')
  t.equal(s.format('iso-full'), '2024-01-01T16:20:00.000Z[UTC]', 'iso-full')
  // a given timezone shows that utc moment on its own clock
  const given = spacetime('2024-01-01T16:20:00Z', 'America/Toronto')
  t.equal(given.format('iso-full'), '2024-01-01T11:20:00.000-05:00[America/Toronto]', 'given timezone')
  const utc = spacetime('2024-01-01T16:20:00', 'UTC')
  t.equal(spacetime(utc.iso()).timezone().name, 'UTC', 'iso round-trip')
  t.equal(spacetime(utc.isoFull()).timezone().name, 'UTC', 'iso-full round-trip')
  t.end()
})

test('a zero offset has one name', (t) => {
  // ('gmt-0' is a real iana name, and is left alone)
  const arr = ['+0h', '-0h', 'utc+0', 'utc-0', '+00:00', '-00:00']
  arr.forEach((tz) => {
    t.equal(spacetime('2024-07-15T12:00:00', tz).timezone().name, 'Etc/GMT', `tz '${tz}'`)
  })
  const strs = ['+00:00', '-00:00', '+0000', '+00']
  strs.forEach((offset) => {
    t.equal(spacetime('2024-07-15T12:00:00' + offset).timezone().name, 'Etc/GMT', `string '${offset}'`)
  })
  t.end()
})

test('-00:00 and +00:00 resolve the same', (t) => {
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
