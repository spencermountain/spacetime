import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { addUnits } from '../src/index.js'
import { parseDuration, parseDateTime } from '../src/lib/parse.js'
import { formatDate } from '../src/lib/format.js'

describe('manual tests', () => {
  const tests = [
    ['2024-03-15T00:00:00', 'P1D', '2024-03-16T00:00:00'],
    ['2024-03-15T00:00:00', 'P2D', '2024-03-17T00:00:00'],
    ['2024-03-15T00:00:00', 'P3D', '2024-03-18T00:00:00'],
  ]
  tests.forEach(([date, duration, expected], i) => {
    test(`${date} + ${duration}`, () => {
      let res = addUnits(parseDateTime(date), parseDuration(duration))
      res = formatDate(res)
      assert.strictEqual(res, expected)
      if (i == 1) {
        console.log('=====HERE=====')
      }
    })
  })
});
