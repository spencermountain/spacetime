import test from 'node:test'
import assert from 'node:assert/strict'
import { addUnits } from '../src/index.js'
import { parseDuration, parseDateTime } from '../src/lib/parse.js'
import { applyDurationToJsDate, compareWithJsDate } from './_lib.js'

// [starting datetime, duration to add]
const tests = [
  // Basic additions
  ['2024-03-15T23:45:00', 'PT2H30M'],
  ['2024-01-01T00:00:00', 'PT24H'],

  // // Month end cases
  // ['2024-01-31T00:00:00', 'P1M'],    // Jan 31 -> Feb 29 (leap year)
  // ['2024-01-31T00:00:00', 'P2M'],    // Jan 31 -> Mar 31
  // ['2024-01-31T00:00:00', 'P3M'],    // Jan 31 -> Apr 30

  // // Leap year cases
  // ['2024-02-28T00:00:00', 'P1D'],    // Feb 28 -> Feb 29
  // ['2023-02-28T00:00:00', 'P1D'],    // Feb 28 -> Mar 1 (non-leap)
  // ['2024-02-29T00:00:00', 'P1Y'],    // Feb 29 -> Feb 28 (next year)

  // // Multiple unit overflow
  // ['2024-12-31T23:59:59', 'PT1S'],   // Full year rollover
  // ['2024-01-31T00:00:00', 'P6M'],    // Multi-month
  // ['2024-01-31T00:00:00', 'P14M'],   // Month overflow to year

  // // Complex cases
  // ['2024-02-29T23:59:59', 'P1Y1D'],  // Leap day plus overflow
  // ['2024-01-31T23:59:59', 'P1M1D']   // Month end plus day
]

test('datetime additions', async (t) => {
  for (const [dateStr, durationStr] of tests) {
    t.test(`${dateStr} + ${durationStr}`, () => {
      // Our implementation
      const state = parseDateTime(dateStr)
      const changes = parseDuration(durationStr)
      const result = addUnits(state, changes)

      // Compare with JS Date
      const jsDate = applyDurationToJsDate(
        new Date(dateStr),
        parseDuration(durationStr)
      )

      assert.ok(compareWithJsDate(result, jsDate))
    })
  }
}) 