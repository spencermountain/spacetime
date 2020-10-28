const test = require('tape')
const spacetime = require('./lib')
const dstParse = require('./lib/dstParse')

// some northern hemisphere zones with dst changes
let zones = [
  'europe/london',
  'europe/ljubljana',
  'europe/kiev',
  'europe/vilnius',
  'atlantic/madeira',
  'america/thunder_bay',
  'america/nassau',
  'asia/famagusta',
  'america/indianapolis',
  'america/tijuana', //11/01:02  -7hrs
  'mexico/bajanorte', //11/01:02  -7hrs
  'america/havana',
  'america/indiana',
  'america/kentucky',
  'america/north_dakota',
  'america/scoresbysund',
  'asia/amman',
  'asia/gaza',
  'asia/hebron',
  'atlantic/azores',
  'asia/damascus', //10/29:24
  'asia/beirut', //10/24:24
  'asia/tehran' //09/20:24
]

test('north-increment-spring', (t) => {
  zones.forEach((tz) => {
    // get fall dst change
    let dstStr = spacetime().timezones[tz].dst
    let change = dstParse(dstStr, 0)
    //create a date 2mins after dst change
    let before = spacetime(change, tz).minus(1, 'hour')
    // create a time 2hrs before a dst change (-2hrs)
    let after = before.clone().add(2, 'hours')
    // start rolling towards the dst shift (but don't hit it)
    for (let i = 0; i < 12; i += 1) {
      let time = before.time()
      t.equal(before.isBefore(after), true, time + ' before-change ' + tz)
      t.equal(before.timezone().current.isDST, false, time + ' dst-off ' + tz)
      before = before.add(10, 'minutes')
    }
    for (let i = 0; i < 14; i += 1) {
      let time = before.time()
      t.equal(before.timezone().current.isDST, true, time + ' dst-now-on ' + tz)
      before = before.add(10, 'minutes')
    }
  })
  t.end()
})

test('north-increment-fall', (t) => {
  zones.forEach((tz) => {
    // get fall dst change
    let dstStr = spacetime().timezones[tz].dst
    let change = dstParse(dstStr, 1)
    //create a date 2mins after dst change
    let after = spacetime(change, tz)
    // create a time 2hrs before a dst change (-3hrs)
    let before = after.clone().minus(3, 'hours')
    // start rolling towards the dst shift (but don't hit it)
    for (let i = 0; i < 12; i += 1) {
      let time = before.time()
      t.equal(before.isBefore(after), true, time + ' before-change ' + tz)
      t.equal(before.timezone().current.isDST, true, time + ' dst-on ' + tz)
      before = before.add(10, 'minutes')
    }
    for (let i = 0; i < 14; i += 1) {
      let time = before.time()
      t.equal(before.timezone().current.isDST, false, time + ' dst-now-off ' + tz)
      before = before.add(10, 'minutes')
    }
  })
  t.end()
})
