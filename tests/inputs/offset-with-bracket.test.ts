import test from 'tape'
import spacetime from '../_lib/index.ts'

// In '2027-01-15T12:00:00-08:00[America/Los_Angeles]' the offset decides the moment,
// and the bracketed name decides which timezone it is shown in.
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

const check = (t: test.Test, input: string, expected: string) => {
  const s = spacetime(input)
  t.equal(s.iso(), expected, input)
  t.equal(s.tz, 'america/los_angeles', input + ' is in the named timezone')
  t.equal(s.epoch, Date.parse(input.replace(/\[.*/, '').replace(' ', 'T')), input + ' keeps the moment')
}

test('an offset that agrees with the named timezone', (t) => {
  pinRules(t)
  check(t, '2027-01-15T12:00:00-08:00[America/Los_Angeles]', '2027-01-15T12:00:00.000-08:00')
  check(t, '2027-07-15T12:00:00-07:00[America/Los_Angeles]', '2027-07-15T12:00:00.000-07:00')
  const s = spacetime('2027-01-15T12:00:00-08:00[America/Los_Angeles]')
  t.equal(s.hasDST(), true, 'has dst')
  t.equal(s.month('july').offset(), -420, 'follows the zone into summer')
  t.end()
})

test('an offset chooses between a repeated hour', (t) => {
  pinRules(t)
  check(t, '2027-11-07T01:30:00-07:00[America/Los_Angeles]', '2027-11-07T01:30:00.000-07:00')
  check(t, '2027-11-07T01:30:00-08:00[America/Los_Angeles]', '2027-11-07T01:30:00.000-08:00')
  t.end()
})

test('an offset that disagrees still sets the moment', (t) => {
  pinRules(t)
  // the wrong season's offset
  check(t, '2027-07-15T12:00:00-08:00[America/Los_Angeles]', '2027-07-15T13:00:00.000-07:00')
  check(t, '2027-01-15T12:00:00-07:00[America/Los_Angeles]', '2027-01-15T11:00:00.000-08:00')
  // an offset from somewhere else
  check(t, '2027-07-15T12:00:00-02:00[America/Los_Angeles]', '2027-07-15T07:00:00.000-07:00')
  check(t, '2027-07-15T12:00:00+05:45[America/Los_Angeles]', '2027-07-14T23:15:00.000-07:00')
  check(t, '2027-07-15T12:00:00+05:17[America/Los_Angeles]', '2027-07-14T23:43:00.000-07:00')
  // utc
  check(t, '2027-07-15T12:00:00Z[America/Los_Angeles]', '2027-07-15T05:00:00.000-07:00')
  check(t, '2027-07-15 12:00:00Z[America/Los_Angeles]', '2027-07-15T05:00:00.000-07:00')
  // a clock time that is skipped in the named timezone
  check(t, '2027-03-14T02:30:00-08:00[America/Los_Angeles]', '2027-03-14T03:30:00.000-07:00')
  t.end()
})

test('no offset reads the clock in the named timezone', (t) => {
  pinRules(t)
  t.equal(spacetime('2027-07-15T12:00:00[America/Los_Angeles]').iso(), '2027-07-15T12:00:00.000-07:00', 'summer')
  t.equal(spacetime('2027-01-15T12:00:00[America/Los_Angeles]').iso(), '2027-01-15T12:00:00.000-08:00', 'winter')
  t.end()
})

test('the timezone argument beats the named timezone', (t) => {
  pinRules(t)
  const s = spacetime('2027-07-15T12:00:00-08:00[America/Los_Angeles]', 'America/New_York')
  t.equal(s.tz, 'america/new_york', 'timezone')
  t.equal(s.iso(), '2027-07-15T16:00:00.000-04:00', 'iso')
  t.end()
})

test('an offset with no fixed zone of its own still sets the moment', (t) => {
  ;['2027-07-15T12:00:00+05:17', '2027-07-15T12:00:00-15:00', '2027-07-15T12:00:00+00:01'].forEach((input) => {
    t.equal(spacetime(input).epoch, Date.parse(input), input)
    t.equal(spacetime(input, tz).epoch, Date.parse(input), input + ' with a timezone')
  })
  t.end()
})
