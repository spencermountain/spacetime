import test from 'tape'
import timekeeper from 'timekeeper'
import spacetime from '../_lib/index.ts'

test('bare years respect January in configured defaults', (t) => {
  timekeeper.freeze(new Date(2026, 7, 20, 12))
  try {
    t.equal(spacetime('2030', 'UTC', { today: { month: 0 } }).format('iso-short'), '2030-01-01', 'January starts on day one')
    t.equal(spacetime('2030', 'UTC', { today: { month: 0, date: 12 } }).format('iso-short'), '2030-01-12', 'explicit January day')
    t.equal(spacetime('2030', 'UTC', { today: { month: 1 } }).format('iso-short'), '2030-02-01', 'nonzero month')
    t.equal(spacetime('2030', 'UTC', { today: { date: 12 } }).format('iso-short'), '2030-08-12', 'day-only default')
    t.equal(spacetime('2030', 'UTC').format('iso-short'), '2030-08-20', 'current date remains the fallback')
  } finally {
    timekeeper.reset()
  }
  t.end()
})
