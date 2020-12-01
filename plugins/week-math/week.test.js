const test = require('tape')
const spacetime = require('../../src')
spacetime.plugin(require('./plugin'))

test('weekOfMonth-getter', (t) => {
  // october 1st starts on a thursday
  let arr = [
    // ['sep 28 2020', 1], //mon
    // ['sep 29 2020', 1], //tues
    // ['sep 30 2020', 1], //wed
    ['oct 1 2020', 1], //thurs
    ['oct 2 2020', 1], //fri
    ['oct 3 2020', 1], //sat
    ['oct 4 2020', 1], //sun
    ['oct 5 2020', 2], //mon
    ['oct 6 2020', 2], //tues
    ['oct 7 2020', 2], //wed
    ['oct 8 2020', 2] //thurs
  ]
  arr.forEach((a) => {
    let s = spacetime(a[0])
    t.equal(s.weekOfMonth(), a[1], a[0] + '  ' + a[1])
  })
  t.end()
})

test('weekOfMonth-setter', (t) => {
  let s = spacetime('oct 8 2020')
  s = s.weekOfMonth(0)
  t.equal(s.format('iso-short'), '2020-09-28', '0')

  s = spacetime('oct 8 2020')
  s = s.weekOfMonth(1)
  t.equal(s.format('iso-short'), '2020-10-05', '1')

  s = spacetime('oct 8 2020')
  s = s.weekOfMonth(2)
  t.equal(s.format('iso-short'), '2020-10-12', '2')
  s = spacetime('oct 8 2020')

  s = spacetime('oct 8 2020')
  s = s.weekOfMonth(3)
  t.equal(s.format('iso-short'), '2020-10-19', '3')

  s = spacetime('oct 8 2020')
  s = s.weekOfMonth(4)
  t.equal(s.format('iso-short'), '2020-10-26', '4')

  s = spacetime('oct 8 2020')
  s = s.weekOfMonth(5)
  t.equal(s.format('iso-short'), '2020-11-02', '5')
  t.end()
})
