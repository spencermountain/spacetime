import test from 'tape'
import spacetime from '../_lib/index.js'

test('daytime-consistent', (t) => {
  let s = spacetime.now()
  const times = ['morning', 'afternoon', 'evening', 'night']
  times.forEach((daytime) => {
    s = s.dayTime(daytime)
    t.equal(s.dayTime(), daytime, daytime + ' is ' + daytime)
  })
  t.end()
})

test('daytime-sanity-test', (t) => {
  let s = spacetime.now()
  let time = '2am'
  s = s.time(time)
  t.equal(s.dayTime(), 'night', time + ' is night')

  time = '7am'
  s = s.time(time)
  t.equal(s.dayTime(), 'morning', time + ' is morning')

  time = '7:01am'
  s = s.time(time)
  t.equal(s.dayTime(), 'morning', time + ' is morning')

  time = '11:59am'
  s = s.time(time)
  t.equal(s.dayTime(), 'morning', time + ' is morning')

  time = '12:00pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'afternoon', time + ' is afternoon')

  time = '12:01pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'afternoon', time + ' is afternoon')

  time = '2:47pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'afternoon', time + ' is afternoon')

  time = '6pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'evening', time + ' is evening')

  time = '6:02pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'evening', time + ' is evening')

  time = '9:07pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'evening', time + ' is evening')

  time = '11pm'
  s = s.time(time)
  t.equal(s.dayTime(), 'night', time + ' is night')

  time = '12am'
  s = s.time(time)
  t.equal(s.dayTime(), 'night', time + ' is night')

  time = '12:00am'
  s = s.time(time)
  t.equal(s.dayTime(), 'night', time + ' is night')

  time = '12:01am'
  s = s.time(time)
  t.equal(s.dayTime(), 'night', time + ' is night')

  t.end()
})

test('isAwake', (t) => {
  let s = spacetime('March 26, 1999 13:42:00', 'Canada/Eastern')
  t.equal(s.isAwake(), true, 'awake')
  s = spacetime('March 26, 1999 23:42:00', 'Canada/Eastern')
  t.equal(s.isAwake(), false, 'sleeping')
  t.end()
})

test('asleep-test', (t) => {
  let s = spacetime.now()
  s = s.dayTime('night')
  t.equal(s.isAsleep(), true, 'sleeping at night')
  s = s.hour(2)
  t.equal(s.isAsleep(), true, 'sleeping at 2am')
  s = s.hour12(4)
  t.equal(s.isAsleep(), true, 'sleeping at 4am')
  s = s.dayTime('lunch')
  t.equal(s.isAsleep(), false, 'awake at lunch')
  s = s.hour24(14)
  t.equal(s.isAsleep(), false, 'awake at 2pm')
  s = s.dayTime('evening')
  t.equal(s.isAsleep(), false, 'awake at evening')
  t.end()
})
