import test from 'tape'
import spacetime from './lib/index.js'
import dstParse from './lib/dstParse.js'
// some northern hemisphere zones with dst changes
const zones = [
  'australia/act',
  'australia/adelaide',
  'australia/broken_hill',
  'chile/continental', //04/04:24
  // 'chile/easterisland',
]

test('south-increment-march', (t) => {
  zones.forEach((tz) => {
    // get fall dst change
    const dstStr = spacetime().timezones[tz].dst
    const change = dstParse(dstStr, 1)
    //create a date 2mins after dst change
    let before = spacetime(change, tz).minus(1, 'hour')
    // create a time 2hrs before a dst change (-2hrs)
    const after = before.clone().add(2, 'hours')
    // start rolling towards the dst shift (but don't hit it)
    for (let i = 0; i < 12; i += 1) {
      const time = before.time()
      t.equal(before.isBefore(after), true, time + ' before-change ' + tz)
      t.equal(before.timezone().current.isDST, false, time + ' dst-off ' + tz)
      before = before.add(10, 'minutes')
    }
    for (let i = 0; i < 14; i += 1) {
      const time = before.time()
      t.equal(before.timezone().current.isDST, true, time + ' dst-now-on ' + tz)
      before = before.add(10, 'minutes')
    }
  })
  t.end()
})

test('south-increment-nov', (t) => {
  zones.forEach((tz) => {
    // get fall dst change
    const dstStr = spacetime().timezones[tz].dst
    const change = dstParse(dstStr, 0)
    //create a date 2mins after dst change
    const after = spacetime(change, tz)
    // create a time 2hrs before a dst change (-3hrs)
    let before = after.clone().minus(3, 'hours')
    // start rolling towards the dst shift (but don't hit it)
    for (let i = 0; i < 12; i += 1) {
      const time = before.time()
      t.equal(before.isBefore(after), true, time + ' before-change ' + tz)
      t.equal(before.timezone().current.isDST, true, time + ' dst-on ' + tz)
      before = before.add(10, 'minutes')
    }
    for (let i = 0; i < 14; i += 1) {
      const time = before.time()
      t.equal(before.timezone().current.isDST, false, time + ' dst-now-off ' + tz)
      before = before.add(10, 'minutes')
    }
  })
  t.end()
})

// oracle: native Intl offset (minutes) for a UTC instant
function intlOffsetMin(tz, utcISO) {
  const v = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' })
    .formatToParts(new Date(utcISO))
    .find((x) => x.type === 'timeZoneName').value // e.g. 'GMT+11:00'
  const m = v.match(/GMT([+-])(\d{2}):(\d{2})/)
  if (!m) return 0
  const sign = m[1] === '-' ? -1 : 1
  return sign * (+m[2] * 60 + +m[3])
}

test('Lord Howe half-hour DST offset', (t) => {
  const tz = 'Australia/Lord_Howe'
  // January = southern summer = DST on. Intl: +11:00 (660 min).
  const janUTC = '2026-01-15T00:00:00Z'
  const jan = spacetime(new Date(janUTC).getTime(), tz)
  t.equal(jan.offset(), intlOffsetMin(tz, janUTC), 'Lord Howe January offset matches Intl (+11:00)')

  // July = southern winter = standard. Intl: +10:30 (630 min).
  const julUTC = '2026-07-15T00:00:00Z'
  const jul = spacetime(new Date(julUTC).getTime(), tz)
  t.equal(jul.offset(), intlOffsetMin(tz, julUTC), 'Lord Howe July offset matches Intl (+10:30)')
  t.end()
})
