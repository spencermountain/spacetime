import test from 'tape'
import { execFileSync } from 'node:child_process'

const source = new URL('../src/index.js', import.meta.url).href
const script = `
  import spacetime from ${JSON.stringify(source)}
  const cases = [
    ['2026-03-08T08:59:59.123Z', 'America/Inuvik'],
    ['2026-03-08T02:30:00Z', 'UTC'],
    ['2026-11-01T01:30:00Z', 'UTC'],
    ['2026-03-29T02:30:00Z', 'UTC'],
    ['2026-10-25T02:30:00Z', 'UTC'],
    ['2026-04-05T01:45:00Z', 'UTC'],
    ['2026-10-04T02:15:00Z', 'UTC'],
    ['2026-03-08T06:59:59Z', 'America/Toronto'],
    ['2026-03-08T07:00:00Z', 'America/Toronto'],
    ['2026-11-01T05:59:59Z', 'America/Toronto'],
    ['2026-11-01T06:00:00Z', 'America/Toronto'],
    ['2026-10-03T15:29:59Z', 'Australia/Lord_Howe'],
    ['2026-10-03T15:30:00Z', 'Australia/Lord_Howe'],
    ['2026-12-31T23:45:00Z', 'Asia/Kathmandu'],
    ['2024-02-29T23:30:00Z', 'America/New_York']
  ]
  const rows = cases.map(([instant, zone]) => {
    const s = spacetime(Date.parse(instant), zone)
    return {
      iso: s.format('iso'), epoch: s.epoch, native: s.toNativeDate().getTime(),
      fields: [s.year(), s.month(), s.date(), s.day(), s.hour(), s.minute(), s.second(), s.millisecond()],
      ordinal: s.dayOfYear(), week: s.week(),
      setters: [s.hour(12), s.minute(20), s.date(15), s.month(1), s.year(2024), s.day('monday')].map(d => d.format('iso')),
      arithmetic: [s.add(1, 'day'), s.subtract(1, 'day'), s.add(1, 'month'), s.startOf('day'), s.endOf('month')].map(d => d.format('iso'))
    }
  })
  const parsed = [
    ['2026-03-08 02:30', 'UTC'],
    ['2026-03-29 02:30', 'UTC'],
    ['2026-10-04 02:15', 'UTC'],
    [[2026, 2, 8, 1, 59, 59], 'America/Inuvik'],
    [{year: 2024, month: 1, date: 29, hour: 12, minute: 0, second: 0, millisecond: 0}, 'Asia/Kathmandu']
  ].map(([input, zone]) => spacetime(input, zone).format('iso'))
  const calendar = [4, 99, 1900, 2000, 2024].map(year => {
    const s = spacetime([year, 11, 31], 'UTC')
    return [s.year(), s.dayOfYear()]
  })
  console.log(JSON.stringify({rows, parsed, calendar}))
`

const run = host => JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e', script], {
  env: { ...process.env, TZ: host },
  encoding: 'utf8',
  timeout: 20000
}))

test('clock fields and operations are independent of host DST', t => {
  const baseline = run('UTC')
  t.equal(baseline.rows[0].iso, '2026-03-08T01:59:59.123-07:00', 'Inuvik clock at the reported instant')
  t.deepEqual(baseline.rows[0].fields, [2026, 2, 8, 0, 1, 59, 59, 123], 'all clock fields')
  t.equal(baseline.rows[8].iso, '2026-03-08T03:00:00.000-04:00', 'destination spring-forward still applies')
  t.equal(baseline.rows[10].iso, '2026-11-01T01:00:00.000-05:00', 'destination fallback still applies')
  t.deepEqual(baseline.calendar, [[4, 366], [99, 365], [1900, 365], [2000, 366], [2024, 366]], 'day-of-year handles small years and leap centuries')
  baseline.rows.forEach(row => t.equal(row.native, row.epoch, 'native Date preserves the instant'))
  ;['America/Toronto', 'Europe/Berlin', 'Australia/Lord_Howe', 'Asia/Kathmandu'].forEach(host => {
    t.deepEqual(run(host), baseline, host)
  })
  t.end()
})
