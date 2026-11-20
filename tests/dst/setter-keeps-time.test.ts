import test from 'tape'
import spacetime from '../_lib/index.ts'

// Lord Howe shifts by 30 minutes. Moving the hour across that change
// should keep the minutes and seconds the user had.
test('hour() keeps minutes across a half-hour dst change', (t) => {
  // dst starts 2027-10-03 at 2:00 (clocks jump to 2:30)
  let s = spacetime('2027-10-03T00:49:29.123', 'Australia/Lord_Howe')
  t.equal(s.hour(10).iso(), '2027-10-03T10:49:29.123+11:00', 'forward over the jump')
  t.equal(s.hour(23).iso(), '2027-10-03T23:49:29.123+11:00', 'end of day')
  s = spacetime('2027-10-03T10:49:29.123', 'Australia/Lord_Howe')
  t.equal(s.hour(1).iso(), '2027-10-03T01:49:29.123+10:30', 'back over the jump')
  // dst ends 2027-04-04 at 2:00 (clocks go back to 1:30)
  s = spacetime('2027-04-04T00:49:29.123', 'Australia/Lord_Howe')
  t.equal(s.hour(10).iso(), '2027-04-04T10:49:29.123+10:30', 'forward over the fall-back')
  t.equal(s.hour(10).minute(), 49, 'minute kept')
  t.end()
})

test('dayOfYear() keeps the time of day', (t) => {
  let s = spacetime('2026-05-31T10:30:15.250', 'UTC')
  t.equal(s.dayOfYear(60).iso(), '2026-03-01T10:30:15.250Z', 'utc')
  s = spacetime('2026-05-31T10:30:15.250', 'America/New_York')
  t.equal(s.dayOfYear(60).iso(), '2026-03-01T10:30:15.250-05:00', 'before dst')
  t.equal(s.dayOfYear(80).iso(), '2026-03-21T10:30:15.250-04:00', 'after dst')
  s = spacetime('2026-05-31T10:30:15.250', 'Europe/Paris')
  t.equal(s.dayOfYear(88).iso(), '2026-03-29T10:30:15.250+02:00', 'on the dst day')
  t.end()
})
