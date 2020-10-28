const test = require('tape')
const spacetime = require('./lib')

test('informal timezones', (t) => {
  let arr = [
    ['Toronto', 'America/Toronto'],
    ['toronto', 'America/Toronto'],
    ['toronto time', 'America/Toronto'],
    ['toronto standard time', 'America/Toronto'],
    ['eastern daylight', 'Canada/Eastern'],
    ['Jamaica', 'America/Jamaica'],
    // ['PST', 'America/Los_Angeles'],
    // ['pdt', 'America/Los_Angeles'],
    // ['bst', 'Europe/London'],
    ['pacific', 'America/Los_Angeles'],
    ['pacific standard', 'America/Los_Angeles'],
    ['pacific daylight', 'America/Los_Angeles'],
    ['GMT+8', '-8h']
    // ['east african', 'eastern africa']
  ]
  const date = 'November 11, 1999'
  arr.forEach((a) => {
    let left = spacetime(date, a[0])
    let right = spacetime(date, a[1])
    t.equal(left.format('nice'), right.format('nice'), a[0])
  })
  t.end()
})
