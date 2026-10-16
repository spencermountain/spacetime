import test from 'tape'
import holiday from '../src/index.js'

test('seasons use the local date of the astronomical event', (t) => {
  // USNO: September 23, 2026 at 00:05 UT.
  for (const [timezone, expected] of [
    ['UTC', '2026-09-23'],
    ['America/New_York', '2026-09-22'],
    ['Asia/Tokyo', '2026-09-23']
  ]) {
    const date = holiday('fall equinox', 2026, timezone)
    t.equal(date.format('iso-short'), expected, timezone)
    t.equal(date.hour(), 0, 'returns local midnight')
  }
  t.equal(holiday('spring equinox', 2003, 'UTC').format('iso-short'), '2003-03-21')
  t.equal(holiday('summer solstice', 2000, 'UTC').format('iso-short'), '2000-06-21')
  t.ok(holiday('winter solstice', 2100, 'UTC')?.isValid(), 'last supported year')
  t.equal(holiday('fall equinox', 1999, 'UTC'), null, 'no invented dates before table')
  t.equal(holiday('fall equinox', 2101, 'UTC'), null, 'no invented dates after table')
  t.end()
})

test('Islamic civil calendar dates and Gregorian year rollover', (t) => {
  for (const timezone of ['UTC', 'Asia/Singapore', 'America/New_York']) {
    t.equal(holiday('eid al-adha', 2026, timezone).format('iso-short'), '2026-05-27', timezone)
    t.equal(holiday('ramadan', 2030, timezone).format('iso-short'), '2030-01-06', 'first occurrence')
    const next = holiday.next('ramadan', { from: '2030-02-01', timezone })
    t.equal(next.format('iso-short'), '2030-12-26', 'second occurrence in the same year')
    t.equal(next.hour(), 0, 'local midnight')
    t.equal(holiday.next('ramadan', { from: '2030-12-26', timezone }).format('iso-short'), '2030-12-26', 'today is included')
    t.equal(holiday.next('ramadan', { from: '2030-12-27', timezone }).format('iso-short'), '2031-12-15', 'following Islamic year')
    t.equal(holiday('eid al-fitr', 2030, timezone).format('iso-short'), '2030-02-05')
  }
  t.equal(holiday('eid al-adha', 2018, 'UTC').format('iso-short'), '2018-08-22', 'corrected anchor year')
  t.equal(holiday.next('unknown holiday', { from: '2030-02-01', timezone: 'UTC' }), null)
  t.end()
})
