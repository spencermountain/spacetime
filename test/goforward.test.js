const test = require('tape')
const spacetime = require('./lib')

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
    ['hour', '3', '5'][('time', '2:43', '2:52')]
    // ['','',''],
    // ['','',''],
    // ['','',''],
  ]
  arr.forEach((a) => {
    let [fn, before, after] = a
    let s = spacetime.now()[fn](before)
    let fwdNull = s[fn](after)
    t.equal(s.isBefore(fwdNull), true, `[${fn}] fwd-null`)
    let fwd = s[fn](after, true)
    t.equal(s.isBefore(fwd), true, `[${fn}] fwd`)
    let bkwd = s[fn](after, false)
    t.equal(s.isAfter(bkwd), true, `[${fn}] bkwd`)
  })
  t.end()
})
