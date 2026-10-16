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
  const s = spacetime('2020-01-15', 'UTC')
  const cases = [
    ['2am', 'night'], ['7am', 'morning'], ['7:01am', 'morning'],
    ['11:59am', 'morning'], ['12:00pm', 'afternoon'], ['12:01pm', 'afternoon'],
    ['2:47pm', 'afternoon'], ['6pm', 'evening'], ['6:02pm', 'evening'],
    ['9:07pm', 'evening'], ['11pm', 'night'], ['12am', 'night'],
    ['12:00am', 'night'], ['12:01am', 'night']
  ]
  cases.forEach(([time, expected]) => {
    t.equal(s.time(time).dayTime(), expected, `2020-01-15 UTC: dayTime at ${time}`)
  })
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
