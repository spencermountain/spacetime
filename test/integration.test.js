const test = require('tape')
const spacetime = require('./lib')
//ST  = winter.   november -> march
//DST = summer.   march    -> november

let timezones = ['America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York']

test('ST → ST', (t) => {
  timezones.forEach((tz) => {
    //start in ST - december 5th 2010 5:00am
    let d1 = spacetime([2010, 11, 5, 5, 0], tz)
    let str = d1.format('nice')
    let isDST = d1.timezone().current.isDST
    t.equal(str, 'Dec 5th, 5:00am', 'init-time')
    t.equal(isDST, false, 'init-dst-off ' + tz)
    //move it to a new time in ST
    d1 = d1.add(3, 'days')
    str = d1.format('nice')
    isDST = d1.timezone().current.isDST
    t.equal(str, 'Dec 8th, 5:00am', 'new-date')
    t.equal(isDST, false, 'still-dst-off')
  })
  t.end()
})

test('ST → DST', (t) => {
  timezones.forEach((tz) => {
    //start in ST - december 5th 2010 10:20am
    let d1 = spacetime([2010, 11, 5, 10, 0], tz)
    let str = d1.format('nice')
    let isDST = d1.timezone().current.isDST
    t.equal(str, 'Dec 5th, 10:00am', 'init-time')
    t.equal(isDST, false, 'init-dst-off ' + tz)
    //move it to a new time in DST - April 5th
    d1 = d1.add(4, 'months')
    str = d1.format('nice')
    isDST = d1.timezone().current.isDST
    t.equal(str, 'Apr 5th, 10:00am', 'new-date')
    t.equal(isDST, true, 'dst-now-on')
  })
  t.end()
})

test('DST → DST', (t) => {
  timezones.forEach((tz) => {
    //start in DST - june 5th 2010 3:00pm
    let d1 = spacetime([2010, 5, 5, 15, 0], tz)
    let str = d1.format('nice')
    let isDST = d1.timezone().current.isDST
    t.equal(str, 'Jun 5th, 3:00pm', 'init-time')
    t.equal(isDST, true, 'init-dst-on ' + tz)
    //move it to a new time in DST - July 5th
    d1 = d1.add(1, 'months')
    str = d1.format('nice')
    isDST = d1.timezone().current.isDST
    t.equal(str, 'Jul 5th, 3:00pm', 'new-date')
    t.equal(isDST, true, 'dst-still-on')
  })
  t.end()
})

test('DST → ST', (t) => {
  timezones.forEach((tz) => {
    //start in DST - june 5th 2010 8:00pm
    let d1 = spacetime([2010, 5, 5, 20, 0], tz)
    let str = d1.format('nice')
    let isDST = d1.timezone().current.isDST
    t.equal(str, 'Jun 5th, 8:00pm', 'init-time')
    t.equal(isDST, true, 'init-dst-on ' + tz)
    //move it to a new time in ST - December 5th
    d1 = d1.add(6, 'months')
    str = d1.format('nice')
    isDST = d1.timezone().current.isDST
    t.equal(str, 'Dec 5th, 8:00pm', 'new-date')
    t.equal(isDST, false, 'dst-now-off')
  })
  t.end()
})
