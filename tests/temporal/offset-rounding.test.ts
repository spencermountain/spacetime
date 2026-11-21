import test from 'tape'
import spacetime from '../../src/temporal/index.ts'
const options = { skip: !globalThis.Temporal }

// 317 minutes is 5.283333333333333 hours, and (5.283333333333333 % 1) * 60 is 16.999999999999993
test('Temporal offsets: +05:17 prints whole minutes', options, (t) => {
  const s = spacetime('2024-03-04T10:00:00', '+05:17')
  t.equal(s.iso(), '2024-03-04T10:00:00.000+05:17', 'iso')
  t.equal(s.format('offset'), '+05:17', 'offset')
  t.equal(s.unixFmt('Z'), '+0517', 'unixFmt Z')
  t.equal(s.unixFmt('ZZZZ'), '+05:17', 'unixFmt ZZZZ')
  t.equal(s.offset(), 317, 'offset in minutes')
  t.equal(spacetime('2024-03-04T10:00:00', '-05:17').iso(), '2024-03-04T10:00:00.000-05:17', 'negative')
  t.equal(spacetime('2024-03-04T10:00:00', '+09:07').iso(), '2024-03-04T10:00:00.000+09:07', 'padded minutes')
  t.equal(spacetime('2024-03-04T10:00:00+05:17').iso(), '2024-03-04T10:00:00.000+05:17', 'offset from the string')
  t.equal(spacetime('2024-03-04T10:00:00', 'UTC').unixFmt('Z'), '+0000', 'utc unixFmt Z')
  t.end()
})

test('Temporal offsets: every whole-minute offset matches native', options, (t) => {
  const bad: string[] = []
  for (let mins = -1439; mins <= 1439; mins += 1) {
    const abs = Math.abs(mins)
    const sign = mins < 0 ? '-' : '+'
    const tz = `${sign}${String(Math.trunc(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`
    const s = spacetime('2024-03-04T10:00:00', tz)
    const want = mins === 0 ? 'Z' : tz
    const ok = s.format('offset') === want &&
      s.iso() === `2024-03-04T10:00:00.000${want}` &&
      s.unixFmt('ZZZZ') === tz &&
      s.unixFmt('Z') === tz.replace(':', '') &&
      s.toTemporal().offset === tz &&
      s.offset() === mins
    if (!ok) {
      bad.push(tz)
    }
  }
  t.deepEqual(bad, [], 'no offsets misprinted')
  t.end()
})

test('Temporal offsets: sub-minute offsets round like native', options, (t) => {
  // amsterdam's local-mean-time was +00:17:30
  const s = spacetime('1850-03-04T10:00:00', 'Europe/Amsterdam')
  t.equal(s.offset(), 17.5, 'offset keeps the half-minute')
  t.equal(s.format('offset'), '+00:18', 'printed to the minute')
  t.equal(s.toTemporal().toString(), '1850-03-04T10:00:00+00:18[Europe/Amsterdam]', 'same as the native string')
  t.end()
})

// 1.005 * 1000 is 1004.9999999999999
test('Temporal seconds convert to whole milliseconds', options, (t) => {
  const cases = [
    [1.005, 1005],
    [4.35, 4350],
    [0.57, 570],
    [2.675, 2675],
    [1700000000.123, 1700000000123],
    [123, 123000]
  ]
  cases.forEach(([secs, epoch]) => {
    t.equal(spacetime.fromUnixSeconds(secs, 'UTC').epoch, epoch, `fromUnixSeconds(${secs})`)
    t.equal(spacetime(0, 'UTC').epochSeconds(secs).epoch, epoch, `epochSeconds(${secs})`)
  })
  t.end()
})

// 0.3 * 60 is 17.999999999999996
test('Temporal hourFloat lands on the whole minute', options, (t) => {
  const s = spacetime('2024-03-04T10:00:00', 'UTC')
  const cases: [number, string][] = [
    [5.3, '5:18'],
    [5.55, '5:33'],
    [9.7, '9:42'],
    [2.05, '2:03'],
    [13.1, '13:06'],
    [4.35, '4:21'],
    [8.2, '8:12'],
    [7.25, '7:15'],
    [5.51, '5:30'],
    [23.999, '23:59'],
    [0, '0:00']
  ]
  cases.forEach(([num, time]) => {
    t.equal(s.hourFloat(num).format('time-24'), time, `hourFloat(${num})`)
  })
  t.end()
})
