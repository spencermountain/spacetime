/* eslint-disable no-console */
// run the full test-suite with the system clock traveled to hazard dates
// usage:  pnpm run test:dates
import { spawnSync } from 'node:child_process'

const runs = [
  // month-end rollover hazards (a 31st, before a shorter month)
  ['2026-01-31T12:00:00'],
  ['2026-03-31T12:00:00'],
  ['2026-05-31T12:00:00'],
  ['2026-08-31T12:00:00'],
  ['2026-10-31T12:00:00'],
  // february + leap-day
  ['2026-02-28T12:00:00'],
  ['2024-02-29T12:00:00'],
  // dst transitions (north-american)
  ['2026-03-08T01:30:00'],
  ['2026-11-01T01:30:00'],
  // local date differs from utc date
  ['2026-10-31T23:55:00'],
  // year boundary + iso-week edges
  ['2026-12-31T23:30:00'],
  ['2027-01-01T00:30:00'],
  ['2026-12-28T12:00:00'],
  ['2025-12-31T12:00:00'],
  // a boring control-date
  ['2026-07-15T12:00:00'],
  // foreign machine-timezones
  ['2026-10-31T12:00:00', 'Australia/Adelaide'],
  ['2026-11-01T01:30:00', 'America/Los_Angeles'],
  ['2026-03-29T00:30:00', 'Europe/London']
]

const runSuite = (fakeDate, tz) => {
  const env = Object.assign({}, process.env, { FAKE_DATE: fakeDate })
  if (tz) {
    env.TZ = tz
  }
  return spawnSync(
    process.execPath,
    ['--import', 'tsx', 'tests/_lib/run.ts', 'tests/_lib/freeze.ts', 'tests'],
    { env, encoding: 'utf8', maxBuffer: 1024 * 1024 * 64 }
  )
}

let failed = 0
for (let i = 0; i < runs.length; i += 1) {
  const [fakeDate, tz] = runs[i]
  const res = runSuite(fakeDate, tz)
  const lines = ((res.stdout || '') + (res.stderr || '')).split('\n')
  const fails = lines.filter((line) => /^not ok /.test(line))
  const passes = lines.filter((line) => /^ok /.test(line)).length
  const label = tz ? `${fakeDate}  TZ=${tz}` : fakeDate
  if (fails.length > 0 || passes === 0 || res.status !== 0) {
    failed += 1
    console.log(`✗  ${label}  -  ${fails.length} failures  (${passes} passed)`)
    fails.forEach((line) => console.log(`     ${line}`))
  } else {
    console.log(`✓  ${label}  -  ${passes} passed`)
  }
}

if (failed > 0) {
  console.log(`\n${failed} of ${runs.length} dates failed`)
  process.exit(1)
}
console.log(`\nall ${runs.length} dates passed`)
