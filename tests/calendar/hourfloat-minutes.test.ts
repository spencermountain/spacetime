import test from 'tape'
import spacetime from '../_lib/index.ts'

test('hourFloat preserves whole minutes near the Unix epoch', t => {
  const s = spacetime(0, 'UTC')
  for (const [value, expected] of [[5.3, '5:18'], [5.55, '5:33'], [9.7, '9:42'], [2.05, '2:03'], [13.1, '13:06'], [5.51, '5:30'], [23.999, '23:59']] as [number, string][]) {
    t.equal(s.hourFloat(value).format('time-24'), expected, String(value))
  }
  const failures: string[] = []
  for (let hour = 0; hour < 24; hour += 1) {
    for (let minute = 0; minute < 60; minute += 1) {
      const original = s.hour(hour).minute(minute)
      if (original.hourFloat(original.hourFloat()).epoch !== original.epoch) {
        failures.push(original.time())
      }
    }
  }
  t.deepEqual(failures, [], 'every minute survives a getter/setter round trip')
  t.equal(s.epoch, 0, 'source is unchanged')
  t.end()
})
