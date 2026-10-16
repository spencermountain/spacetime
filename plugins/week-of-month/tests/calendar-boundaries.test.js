import test from 'tape'
import spacetime from 'spacetime'
import plugin from '../src/index.js'

spacetime.extend(plugin)

test('week of month: Monday-aligned month boundaries', t => {
  const cases = [[1, 1], [7, 1], [8, 2], [14, 2], [15, 3], [21, 3], [22, 4], [28, 4], [29, 5], [30, 5]]
  for (const [date, expected] of cases) {
    const s = spacetime([2026, 5, date], 'UTC').weekStart('monday')
    const epoch = s.epoch
    t.equal(s.weekOfMonth(), expected, `June ${date} is in week ${expected}`)
    t.equal(s.epoch, epoch, 'reading the week leaves the instant unchanged')
  }
  t.end()
})

test('week of month: result follows local date rather than UTC date', t => {
  const monday = spacetime('2026-06-08T00:30:00', 'Pacific/Auckland').weekStart('monday')
  const sunday = monday.goto('America/Los_Angeles')
  t.equal(monday.weekOfMonth(), 2, 'Monday starts the second week in Auckland')
  t.equal(sunday.weekOfMonth(), 1, 'the same instant is still Sunday in Los Angeles')
  t.equal(monday.epoch, sunday.epoch, 'both represent the same instant')
  t.end()
})
