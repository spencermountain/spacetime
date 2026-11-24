import test from 'tape'
import spacetime from '../_lib/index.ts'

test('differences accept plain epoch objects', t => {
  const start = spacetime(0, 'UTC')
  for (const epoch of [0, 86400000, -86400000]) {
    for (const tz of [undefined, 'Asia/Kolkata']) {
      const input = tz ? { epoch, tz } : { epoch }
      const expected = spacetime(input, tz || 'UTC')
      t.doesNotThrow(() => {
        t.deepEqual(start.diff(input), start.diff(expected), `diff ${epoch} ${tz}`)
        t.equal(start.diff(input, 'hour'), start.diff(expected, 'hour'), 'single-unit difference')
        t.deepEqual(start.since(input), start.since(expected), `since ${epoch} ${tz}`)
      }, 'plain objects need no instance methods')
      t.deepEqual(input, tz ? { epoch, tz } : { epoch }, 'input is not changed')
    }
  }
  t.equal(start.epoch, 0, 'receiver is unchanged')
  t.end()
})
