import test from 'tape'
import spacetime from '../_lib/index.ts'

test('object inputs accept their timezone as either tz or timezone', (t) => {
  const parts = { year: 2024, month: 5, date: 1, hour: 9, minute: 0, second: 0, millisecond: 0 }
  for (const key of ['tz', 'timezone']) {
    const fromEpoch = spacetime({ epoch: 0, [key]: 'Asia/Kolkata' })
    t.equal(fromEpoch.tz, 'asia/kolkata', `epoch object reads ${key}`)
    t.equal(fromEpoch.format('iso'), '1970-01-01T05:30:00.000+05:30', `epoch object uses ${key} offset`)

    const fromParts = spacetime({ ...parts, [key]: 'Asia/Kolkata' })
    t.equal(fromParts.tz, 'asia/kolkata', `date-parts object reads ${key}`)
    t.equal(fromParts.format('iso'), '2024-06-01T09:00:00.000+05:30', `date-parts object uses ${key} wall-clock`)

    t.throws(() => spacetime({ epoch: 0, [key]: 'flagbarg' }), /Cannot find timezone/, `epoch object rejects unknown ${key}`)
    t.throws(() => spacetime({ ...parts, [key]: 'flagbarg' }), /Cannot find timezone/, `date-parts object rejects unknown ${key}`)

    const set = spacetime(0, 'UTC').set({ epoch: 0, [key]: 'Asia/Kolkata' })
    t.equal(set.tz, 'asia/kolkata', `.set() epoch object reads ${key}`)
  }
  t.end()
})

test('each object shape prefers its own key when both are given', (t) => {
  t.equal(spacetime({ epoch: 0, tz: 'Asia/Kolkata', timezone: 'Europe/Paris' }).tz, 'asia/kolkata', 'epoch object prefers tz')
  t.equal(spacetime({ year: 2024, tz: 'Asia/Kolkata', timezone: 'Europe/Paris' }).tz, 'europe/paris', 'date-parts object prefers timezone')
  t.end()
})

test('a spacetime instance as input keeps its own timezone', (t) => {
  const s = spacetime(0, 'Asia/Kolkata')
  t.equal(spacetime(s).tz, 'asia/kolkata', 'instance timezone method is not mistaken for a name')
  t.end()
})
