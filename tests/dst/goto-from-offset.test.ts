import test from 'tape'
import spacetime from '../_lib/index.ts'

// #376 - an iso string with an offset is a fixed-offset time, like 'etc/gmt+8'.
// Moving it to a regional zone beside a dst change must keep the same instant.
const tz = 'America/Los_Angeles'

// Pin the rule, so these dates stay on the changes when the bundled data moves.
const pinRules = (t: test.Test) => {
  const s = spacetime(null, 'UTC')
  const original = s.timezones
  s.timezones = {
    ...original,
    'america/los_angeles': { ...original['america/los_angeles'], dst: '03/14:02->11/07:02' }
  }
  t.teardown(() => { s.timezones = original })
}

test('goto from an offset, beside the spring change', (t) => {
  pinRules(t)
  const cases = [
    ['2027-03-14T00:39:00-08:00', '2027-03-14T00:39:00.000-08:00'],
    ['2027-03-14T01:39:00-08:00', '2027-03-14T01:39:00.000-08:00'],
    ['2027-03-14T01:59:59-08:00', '2027-03-14T01:59:59.000-08:00'],
    // 2am never happens
    ['2027-03-14T02:00:00-08:00', '2027-03-14T03:00:00.000-07:00'],
    ['2027-03-14T02:39:00-08:00', '2027-03-14T03:39:00.000-07:00'],
    ['2027-03-14T03:39:00-07:00', '2027-03-14T03:39:00.000-07:00']
  ]
  cases.forEach(([input, expected]) => {
    const s = spacetime(input).goto(tz)
    t.equal(s.iso(), expected, input)
    t.equal(s.epoch, Date.parse(input), input + ' keeps the instant')
  })
  t.end()
})

test('goto from an offset, beside the fall change', (t) => {
  pinRules(t)
  const cases = [
    ['2027-11-07T00:39:00-07:00', '2027-11-07T00:39:00.000-07:00'],
    // 1:39am happens twice
    ['2027-11-07T01:39:00-07:00', '2027-11-07T01:39:00.000-07:00'],
    ['2027-11-07T01:39:00-08:00', '2027-11-07T01:39:00.000-08:00'],
    ['2027-11-07T02:39:00-08:00', '2027-11-07T02:39:00.000-08:00'],
    // the other offset's spelling of the same instants
    ['2027-11-07T02:39:00-07:00', '2027-11-07T01:39:00.000-08:00'],
    ['2027-11-07T00:39:00-08:00', '2027-11-07T01:39:00.000-07:00']
  ]
  cases.forEach(([input, expected]) => {
    const s = spacetime(input).goto(tz)
    t.equal(s.iso(), expected, input)
    t.equal(s.epoch, Date.parse(input), input + ' keeps the instant')
  })
  t.end()
})

test('goto from an offset agrees with the epoch, every 10 minutes around both changes', (t) => {
  pinRules(t)
  const day = 24 * 60 * 60 * 1000
  const failures: string[] = []
  ;[Date.UTC(2027, 2, 14, 10), Date.UTC(2027, 10, 7, 9)].forEach((change) => {
    for (let epoch = change - day; epoch <= change + day; epoch += 10 * 60 * 1000) {
      const want = spacetime(epoch, tz).iso()
      ;[-8, -7].forEach((offset) => {
        const clock = new Date(epoch + offset * 60 * 60 * 1000).toISOString().slice(0, 19)
        const input = `${clock}-0${Math.abs(offset)}:00`
        const have = spacetime(input).goto(tz)
        if (have.iso() !== want || have.epoch !== epoch) {
          failures.push(`${input} -> ${have.iso()}, not ${want}`)
        }
      })
    }
  })
  t.deepEqual(failures, [], 'same local time as the epoch')
  t.end()
})

test('the original report', (t) => {
  pinRules(t)
  // march 12th is before the pinned change
  const s = spacetime('2023-03-12T01:39:00-08:00').goto(tz)
  t.equal(s.time(), '1:39am', 'time')
  t.equal(s.epoch, Date.parse('2023-03-12T01:39:00-08:00'), 'keeps the instant')
  t.end()
})
