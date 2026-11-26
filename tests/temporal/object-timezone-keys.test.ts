import test from 'tape'
import spacetime from '../../src/temporal/index.ts'

test('temporal: object inputs accept their timezone as either tz or timezone', (t) => {
  const parts = { year: 2024, month: 5, date: 1, hour: 9, minute: 0, second: 0, millisecond: 0 }
  for (const key of ['tz', 'timezone']) {
    const fromEpoch = spacetime({ epoch: 0, [key]: 'Asia/Kolkata' })
    t.equal(fromEpoch.tz, 'Asia/Kolkata', `epoch object reads ${key}`)
    t.equal(fromEpoch.hour(), 5, `epoch object uses ${key} offset`)

    const fromParts = spacetime({ ...parts, [key]: 'Asia/Kolkata' })
    t.equal(fromParts.tz, 'Asia/Kolkata', `date-parts object reads ${key}`)
    t.equal(fromParts.hour(), 9, `date-parts object uses ${key} wall-clock`)
  }
  t.equal(spacetime(spacetime(0, 'Asia/Kolkata')).tz, 'Asia/Kolkata', 'an instance as input keeps its timezone')
  t.end()
})
