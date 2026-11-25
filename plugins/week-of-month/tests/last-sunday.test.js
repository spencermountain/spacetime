import test from 'tape'
import spacetime from 'spacetime'
import plugin from '../src/index.js'

spacetime.extend(plugin)

test('lastSunday closes the week containing the last Thursday', t => {
  const cases = [
    ['2026-04-15', '2026-05-03'],
    ['2026-05-15', '2026-05-31'],
    ['2025-06-15', '2025-06-29'],
    ['2026-07-15', '2026-08-02'],
    ['2026-10-15', '2026-11-01']
  ]
  for (const [date, expected] of cases) {
    for (const start of ['monday', 'sunday']) {
      const s = spacetime(date, 'America/Los_Angeles').weekStart(start)
      const epoch = s.epoch
      const result = s.lastSunday()
      t.equal(result.format('iso-short'), expected, `${date}, ${start} week start`)
      t.equal(result.day(), 0, 'the result is a Sunday')
      t.equal(result.hour(), 23, 'the result is at the end of the local day')
      t.equal(result.millisecond(), 999, 'the last millisecond is retained')
      t.equal(s.epoch, epoch, 'the input is unchanged')
    }
  }
  t.end()
})
