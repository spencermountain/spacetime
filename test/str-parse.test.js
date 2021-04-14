const test = require('tape')
const spacetime = require('./lib')

test('string-parse', (t) => {
  let arr = [
    ['Sun Mar 14 15:09:48 1999', 'March 14 1999 3:09:48pm'],
    ['Tue Mar 16 21:49', 'Tues Mar 16 9:49pm'],
    ['Sun Mar 14 15:09:48 +0000 2021', 'March 14 15:09:48 GMT'],
    ['2 February 2003', '2003-02-02'],
    ['08 February 1986', '1986-02-08']
  ]
  arr.forEach((a) => {
    let left = spacetime(a[0])
    let right = spacetime(a[1])
    t.equal(left.iso(), right.iso(), a[0])
  })
  t.end()
})
