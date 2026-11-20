import test from 'tape'
import spacetime from '../_lib/index.ts'
import { formatTimezone } from '../../src/fns.ts'

// offsets are kept as fractional hours, and most minute-counts are not exact in binary
// eg. 317 minutes is 5.283333333333333 hours, and (5.283333333333333 % 1) * 60 is 16.999999999999993
test('formatTimezone prints whole minutes', (t) => {
  t.equal(formatTimezone(317 / 60, ':'), '+05:17', '+05:17')
  t.equal(formatTimezone(-317 / 60, ':'), '-05:17', '-05:17')
  t.equal(formatTimezone(547 / 60, ':'), '+09:07', 'pads the minutes')
  t.equal(formatTimezone(839 / 60), '+1359', 'no delimiter')
  t.equal(formatTimezone(5.75, ':'), '+05:45', 'quarter-hours are unchanged')
  t.equal(formatTimezone(-3.5, ':'), '-03:30', 'half-hours are unchanged')
  t.equal(formatTimezone(0, ':'), '+00:00', 'zero is not negative')
  // sub-minute offsets (old local-mean-times) round like Temporal does
  t.equal(formatTimezone(17.5 / 60, ':'), '+00:18', 'half-minute rounds away from zero')
  t.equal(formatTimezone(-17.5 / 60, ':'), '-00:18', 'negative half-minute rounds away from zero')
  t.end()
})

test('every whole-minute offset survives fractional hours', (t) => {
  const bad: string[] = []
  for (let mins = -1439; mins <= 1439; mins += 1) {
    const abs = Math.abs(mins)
    const sign = mins < 0 ? '-' : '+'
    const want = `${sign}${String(Math.trunc(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`
    if (formatTimezone(mins / 60, ':') !== want) {
      bad.push(want)
    }
  }
  t.deepEqual(bad, [], 'no offsets misprinted')
  t.end()
})

test('fractional zones print clean offsets', (t) => {
  const cases = [
    ['Asia/Kathmandu', '+05:45', '+0545'],
    ['America/St_Johns', '-03:30', '-0330'],
    ['Australia/Lord_Howe', '+11:00', '+1100'],
    ['5.75', '+05:45', '+0545'],
    ['-03:30', '-03:30', '-0330']
  ]
  cases.forEach(([tz, offset, unix]) => {
    const s = spacetime('2024-01-04T10:00:00', tz)
    t.equal(s.format('offset'), offset, `${tz} offset`)
    t.ok(s.iso().endsWith(offset), `${tz} iso`)
    t.equal(s.unixFmt('Z'), unix, `${tz} unixFmt Z`)
    t.equal(s.unixFmt('ZZZZ'), offset, `${tz} unixFmt ZZZZ`)
  })
  const utc = spacetime('2024-01-04T10:00:00', 'UTC')
  t.equal(utc.format('offset'), 'Z', 'utc offset')
  t.equal(utc.unixFmt('Z'), '+0000', 'utc unixFmt Z')
  t.end()
})

test('an iso string with any minute-offset keeps its instant', (t) => {
  const utc = Date.UTC(2024, 2, 4, 10)
  t.equal(spacetime('2024-03-04T10:00:00+05:17').epoch, utc - 317 * 60000, '+05:17')
  t.equal(spacetime('2024-03-04T10:00:00-09:07').epoch, utc + 547 * 60000, '-09:07')
  t.equal(spacetime('2024-03-04T10:00:00+13:59').epoch, utc - 839 * 60000, '+13:59')
  t.end()
})

// 1.005 * 1000 is 1004.9999999999999
test('seconds convert to whole milliseconds', (t) => {
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
test('hourFloat lands on the whole minute', (t) => {
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
    [0, '0:00']
  ]
  cases.forEach(([num, time]) => {
    const res = s.hourFloat(num)
    t.equal(res.format('time-24'), time, `hourFloat(${num})`)
    t.ok(Number.isInteger(res.epoch), `hourFloat(${num}) has a whole epoch`)
  })
  t.end()
})
