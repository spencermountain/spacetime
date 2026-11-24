import test from 'tape'
import spacetime from '../_lib/index.ts'

const epochAt = (year: number, month = 0) => {
  const date = new Date(0)
  date.setUTCFullYear(year, month, 1)
  return date.getTime()
}

test('decade boundaries contain dates before astronomical year zero', t => {
  for (const year of [-1954, -11, -10, -5, -1, 0, 9, 10, 2026]) {
    const epoch = epochAt(year, 5)
    const s = spacetime(epoch, 'UTC')
    const first = Math.floor(year / 10) * 10
    const start = epochAt(first)
    const end = epochAt(first + 10) - 1
    const progress = Number(((epoch - start) / (end - start)).toFixed(2))
    t.equal(s.startOf('decade').epoch, start, `${year} start`)
    t.equal(s.endOf('decade').epoch, end, `${year} end`)
    t.equal(s.decade(), first, `${year} decade getter`)
    t.equal(s.progress('decade'), progress, `${year} named progress`)
    t.equal(s.progress().decade, progress, `${year} aggregate progress`)
    t.equal(s.epoch, epoch, `${year} source is unchanged`)
  }
  t.end()
})

test('negative decade comparisons agree with the rounded-down setter', t => {
  const s = spacetime(epochAt(-1), 'UTC')
  t.equal(s.isSame(spacetime(epochAt(-10), 'UTC'), 'decade'), true, '-10 through -1 share a decade')
  t.equal(s.isSame(spacetime(epochAt(0), 'UTC'), 'decade'), false, 'year zero starts the next decade')
  const historical = spacetime(epochAt(-1954), 'UTC')
  t.equal(historical.decade(), historical.decade(-1954).year(), 'getter and setter use the same decade')
  t.end()
})
