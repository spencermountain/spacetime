import test from 'tape'
import spacetime from '../_lib/index.ts'
import quickOffset from '../../src/timezone/quick.ts'
import inSummerTime from '../../src/timezone/summerTime.ts'
import { normalizeZone } from '../../scripts/tz/lib.js'

// Some years have a single dst change. The rule leaves the other side empty:
// '->11/07:01' is on from the start of the (utc) year, '03/14:02->' stays on to the end of it.
const withZones = (t: test.Test, zones: Record<string, { offset: number; hem: string; dst?: string }>) => {
  const s = spacetime(null, 'UTC')
  const original = s.timezones
  s.timezones = { ...original, ...zones }
  t.teardown(() => { s.timezones = original })
}

const check = (t: test.Test, zone: string, instant: string, offset: number, isDST: boolean) => {
  const s = spacetime(Date.parse(instant), zone)
  t.equal(s.timezone().current.offset, offset, `${zone} offset at ${instant}`)
  t.equal(quickOffset(s), offset, `${zone} fast offset at ${instant}`)
  t.equal(s.timezone().current.isDST, isDST, `${zone} dst at ${instant}`)
}

test('an empty side is open-ended', (t) => {
  const year = Date.UTC(2027, 0, 1)
  const nextYear = Date.UTC(2028, 0, 1)
  const back = Date.UTC(2027, 10, 7, 5) // 11/07:01 at -4
  t.ok(inSummerTime(year, '', '11/07:01', -4, -5), 'on from the first instant of the year')
  t.ok(inSummerTime(back - 1, '', '11/07:01', -4, -5), 'on until the change')
  t.notOk(inSummerTime(back, '', '11/07:01', -4, -5), 'off at the change')
  t.notOk(inSummerTime(nextYear - 1, '', '11/07:01', -4, -5), 'off for the rest of the year')
  const start = Date.UTC(2027, 2, 14, 7) // 03/14:02 at -5
  t.notOk(inSummerTime(year, '03/14:02', '', -4, -5), 'off at the start of the year')
  t.notOk(inSummerTime(start - 1, '03/14:02', '', -4, -5), 'off until the change')
  t.ok(inSummerTime(start, '03/14:02', '', -4, -5), 'on at the change')
  t.ok(inSummerTime(nextYear - 1, '03/14:02', '', -4, -5), 'on until the last instant of the year')
  t.end()
})

test('a year that only falls back', (t) => {
  withZones(t, { 'test/falls': { offset: -4, hem: 'n', dst: '->11/07:01' } })
  check(t, 'test/falls', '2027-01-01T00:00:00Z', -4, true)
  check(t, 'test/falls', '2027-07-01T12:00:00Z', -4, true)
  check(t, 'test/falls', '2027-11-07T04:59:59Z', -4, true)
  check(t, 'test/falls', '2027-11-07T05:00:00Z', -5, false)
  check(t, 'test/falls', '2027-12-31T23:59:59Z', -5, false)
  const s = spacetime('2027-06-15T12:00:00', 'test/falls')
  t.equal(s.hasDST(), true, 'has dst')
  t.deepEqual(s.timezone().change, { start: '', back: '11/07:01' }, 'no start is reported')
  // midnight on january 1st is an ordinary time
  t.equal(s.startOf('year').iso(), '2027-01-01T00:00:00.000-04:00', 'start of year')
  t.equal(spacetime('2027-01-01T00:30:00', 'test/falls').iso(), '2027-01-01T00:30:00.000-04:00', 'parse after midnight')
  // 1am goes back to midnight, so that hour repeats
  const before = spacetime('2027-11-06T23:30:00', 'test/falls')
  t.equal(before.add(1, 'hour').iso(), '2027-11-07T00:30:00.000-04:00', 'first 12:30am')
  t.equal(before.add(2, 'hour').iso(), '2027-11-07T00:30:00.000-05:00', 'second 12:30am')
  t.equal(spacetime('2027-12-31T12:00:00', 'test/falls').iso(), '2027-12-31T12:00:00.000-05:00', 'still off on december 31st')
  t.end()
})

test('a year that only springs forward', (t) => {
  withZones(t, { 'test/springs': { offset: -4, hem: 'n', dst: '03/14:02->' } })
  check(t, 'test/springs', '2027-01-01T00:00:00Z', -5, false)
  check(t, 'test/springs', '2027-03-14T06:59:59Z', -5, false)
  check(t, 'test/springs', '2027-03-14T07:00:00Z', -4, true)
  check(t, 'test/springs', '2027-07-01T12:00:00Z', -4, true)
  check(t, 'test/springs', '2027-12-31T23:59:59Z', -4, true)
  const s = spacetime('2027-06-15T12:00:00', 'test/springs')
  t.deepEqual(s.timezone().change, { start: '03/14:02', back: '' }, 'no end is reported')
  t.equal(s.startOf('year').iso(), '2027-01-01T00:00:00.000-05:00', 'start of year')
  t.equal(spacetime('2027-12-31T12:00:00', 'test/springs').iso(), '2027-12-31T12:00:00.000-04:00', 'still on on december 31st')
  t.equal(spacetime('2027-03-14T01:30:00', 'test/springs').add(1, 'hour').iso(), '2027-03-14T03:30:00.000-04:00', 'skips 2am')
  t.end()
})

// Rules repeat every year, so a lone change is undone where the utc year turns over.
test('a single change resets with the utc year', (t) => {
  withZones(t, { 'test/falls': { offset: -4, hem: 'n', dst: '->11/07:01' } })
  check(t, 'test/falls', '2027-12-31T23:59:59Z', -5, false)
  check(t, 'test/falls', '2028-01-01T00:00:00Z', -4, true)
  t.equal(spacetime(Date.parse('2027-12-31T23:59:59Z'), 'test/falls').iso(), '2027-12-31T18:59:59.000-05:00', 'before')
  t.equal(spacetime(Date.parse('2028-01-01T00:00:00Z'), 'test/falls').iso(), '2027-12-31T20:00:00.000-04:00', 'after')
  t.end()
})

test('single changes in the southern hemisphere', (t) => {
  // southern rules span the winter, so an open start means dst is already off
  withZones(t, {
    'test/south-on': { offset: 10, hem: 's', dst: '->10/03:02' },
    'test/south-off': { offset: 10, hem: 's', dst: '04/04:03->' }
  })
  check(t, 'test/south-on', '2027-01-01T00:00:00Z', 10, false)
  check(t, 'test/south-on', '2027-10-02T15:59:59Z', 10, false)
  check(t, 'test/south-on', '2027-10-02T16:00:00Z', 11, true)
  check(t, 'test/south-on', '2027-12-31T23:59:59Z', 11, true)
  check(t, 'test/south-off', '2027-01-01T00:00:00Z', 11, true)
  check(t, 'test/south-off', '2027-04-03T15:59:59Z', 11, true)
  check(t, 'test/south-off', '2027-04-03T16:00:00Z', 10, false)
  check(t, 'test/south-off', '2027-12-31T23:59:59Z', 10, false)
  t.end()
})

test('Havana only falls back in 2027', (t) => {
  ;['America/Havana', 'Cuba'].forEach((zone) => {
    check(t, zone, '2027-01-01T00:00:00Z', -4, true)
    check(t, zone, '2027-11-07T04:59:59Z', -4, true)
    check(t, zone, '2027-11-07T05:00:00Z', -5, false)
  })
  t.equal(spacetime('2027-06-15T12:00:00', 'America/Havana').startOf('year').iso(), '2027-01-01T00:00:00.000-04:00', 'start of year')
  t.end()
})

test('timezone build writes a single change with an open side', (t) => {
  const on = { offset: -4, dst: true }
  const off = { offset: -5, dst: false }
  const fallsBack = { initial: on, transitions: [{ epoch: Date.UTC(2027, 10, 7, 5), ...off }] }
  const previous = { offset: -4, hem: 'n', dst: '01/01:00->11/07:02' }
  const next = normalizeZone(fallsBack, previous, 'test/zone', 2027)
  t.deepEqual(next, { offset: -4, hem: 'n', dst: '->11/07:01' }, 'only falls back')
  t.deepEqual(normalizeZone(fallsBack, next, 'test/zone', 2027), next, 'stable on subsequent updates')

  const springsForward = { initial: off, transitions: [{ epoch: Date.UTC(2027, 2, 14, 7), ...on }] }
  t.deepEqual(
    normalizeZone(springsForward, { offset: -5, hem: 'n' }, 'test/zone', 2027),
    { offset: -4, hem: 'n', dst: '03/14:02->' },
    'only springs forward, storing the summer offset'
  )

  // southern rules store the winter offset
  const south = { initial: { offset: 11, dst: true }, transitions: [{ epoch: Date.UTC(2027, 3, 3, 16), offset: 10, dst: false }] }
  t.deepEqual(
    normalizeZone(south, { offset: 10, hem: 's', dst: '04/04:03->10/03:02' }, 'test/zone', 2027),
    { offset: 10, hem: 's', dst: '04/04:03->' },
    'southern dst ends and stays off'
  )
  const southOn = { initial: { offset: 10, dst: false }, transitions: [{ epoch: Date.UTC(2027, 9, 2, 16), offset: 11, dst: true }] }
  t.equal(normalizeZone(southOn, { offset: 10, hem: 's' }, 'test/zone', 2027).dst, '->10/03:02', 'southern dst starts and stays on')

  // a midnight fall-back keeps the ':24' spelling
  const midnight = { initial: on, transitions: [{ epoch: Date.UTC(2027, 10, 7, 4), ...off }] }
  t.equal(normalizeZone(midnight, { offset: -4, hem: 'n' }, 'test/zone', 2027).dst, '->11/06:24', 'midnight fall-back')

  // a lone change that is not a dst shift is still refused
  const jump = { initial: off, transitions: [{ epoch: Date.UTC(2027, 2, 14, 7), offset: -3, dst: true }] }
  t.throws(() => normalizeZone(jump, { offset: -5, hem: 'n' }, 'test/zone', 2027), /Unsupported offset\/DST cycle/, 'two-hour jump')
  const flag = { initial: off, transitions: [{ epoch: Date.UTC(2027, 2, 14, 7), offset: -4, dst: false }] }
  t.throws(() => normalizeZone(flag, { offset: -5, hem: 'n' }, 'test/zone', 2027), /Unsupported offset\/DST cycle/, 'offset moves without the dst flag')
  t.end()
})
