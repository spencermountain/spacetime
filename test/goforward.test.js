import test from 'tape'
import spacetime from './lib/index.js'

test('goForward [time]', (t) => {
  let d = spacetime('march 17 2021').time('3:20pm')
  let s = d.time('2:32pm')
  t.equal(s.format('nice'), 'Mar 17th, 2:32pm', '[time] goForward=null bckwd')
  s = d.time('4:32pm')
  t.equal(s.format('nice'), 'Mar 17th, 4:32pm', '[time] goForward=null fwd')

  s = d.time('4:32pm', true)
  t.equal(s.format('nice'), 'Mar 17th, 4:32pm', '[time] goForward-notick')
  s = d.time('2:32pm', true)
  t.equal(s.format('nice'), 'Mar 18th, 2:32pm', '[time] goForward-tick')

  s = d.time('2:32pm', false)
  t.equal(s.format('nice'), 'Mar 17th, 2:32pm', '[time] goForward=false notick')
  s = d.time('4:32pm', false)
  t.equal(s.format('nice'), 'Mar 16th, 4:32pm', '[time] goForward=false tick')

  t.end()
})

test('goForward ', (t) => {
  let arr = [
    ['second', '8', '12'],
    ['minute', '4', '12'],
    ['hour', '3', '5'],
    ['time', '2:43', '2:52'],
    ['date', '3', '5'],
    ['hourFloat', '3.5', '3.7'],
    ['hour12', '9pm', '10pm'],
    ['ampm', 'am', 'pm'],
    ['dayTime', 'breakfast', 'dinner'],
    ['day', 2, 3],
    ['dayName', 'wednesday', 'thurs'],
    ['dayOfYear', 23, 24],
    ['week', 23, 24],
    ['month', 3, 6],
    ['monthName', 'june', 'sep'],
    ['quarter', 'q2', 'q4'],
    ['season', 'spring', 'fall']
  ]
  arr.forEach((a) => {
    let fn = a[0]
    let s = spacetime.now()[fn](a[1])
    // normal after
    let after = s[fn](a[2])
    t.equal(s.isBefore(after), true, `[${fn}] fwd-null`)
    // after-true
    let fwd = s[fn](a[2], true)
    t.equal(s.isBefore(fwd), true, `[${fn}] fwd`)
    // after-false (skip back)
    let bkwd = s[fn](a[2], false)
    t.equal(s.isAfter(bkwd), true, `[${fn}] bkwd`)

    // after->before (definetly)
    let before = after[fn](a[1], false)
    t.equal(before.isBefore(after), true, `[${fn}] go-back-true`)
    let notBefore = after[fn](a[1], true)
    t.equal(notBefore.isBefore(after), false, `[${fn}] go-back-false`)
  })
  t.end()
})
