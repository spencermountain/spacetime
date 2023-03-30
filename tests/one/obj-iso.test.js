import test from 'tape'
import spacetime from './_lib.js'

test('obj-input', (t) => {
  let arr = [
    [{ year: 1983 }, '1983-01-01T00:00:00.000'],//-05:00
    [{ year: 1982, month: 2 }, '1982-02-01T00:00:00.000'],//-05:00
    [{ year: 1981, month: 1, day: 25 }, '1981-01-25T00:00:00.000'],//-05:00
    [{ month: 2 }, '2023-02-01T00:00:00.000'],//-05:00
    [{ month: 7, day: 3 }, '2023-07-03T00:00:00.000'],//-04:00
    [{ year: 1982, day: 25 }, '1982-01-25T00:00:00.000'],//-05:00
    [{ year: 1982, hour: 4 }, '1982-01-01T04:00:00.000'],//-05:00
    [{ year: 1982, month: 12 }, '1982-12-01T00:00:00.000'],//-05:00
    [{ year: 1982, month: 12, day: 1 }, '1982-12-01T00:00:00.000'],//-05:00
    [{ year: 2000, month: 9, day: 29 }, '2000-09-29T00:00:00.000'],//-04:00
    [{ year: 3000, month: 9, day: 29 }, '3000-09-29T00:00:00.000'],//-04:00
    [{ year: 1980, month: 12, day: 29 }, '1980-12-29T00:00:00.000'],//-05:00
    [{ year: 1980, month: 12, day: 29, hour: 9, minute: 59 }, '1980-12-29T09:59:00.000'],//-05:00
    [{ hour: 23 }, '2023-03-15T23:00:00.000'],//-04:00
    [{ day: 21 }, '2023-03-21T00:00:00.000'],//-04:00
    [{ minute: 21 }, '2023-03-15T17:21:00.000'],//-04:00
    [{ second: 21 }, '2023-03-15T17:01:21.000'],//-04:00
    [{ millisecond: 21 }, '2023-03-15T17:01:32.021'],//-04:00
    [{ year: 2019, millisecond: 21 }, '2019-01-01T00:00:00.021'],//-05:00
    [{ year: 2000, hour: 2 }, '2000-01-01T02:00:00.000'],//-05:00
    [{ year: -2000, hour: 2 }, '-002000-01-01T02:00:00.000-05:17'],
  ]
  spacetime.world.methods.now = () => 1678914193206//march 2023
  arr.forEach(a => {
    let [obj, iso] = a
    let out = spacetime(obj).format('iso-medium')
    t.equal(out, iso, JSON.stringify(obj))
  })
  spacetime.world.methods.now = () => new Date().getTime()
  t.end()
})

test('invalid-obj', (t) => {
  let arr = [
    { year: 1980, month: 12, day: 29, hour: 9, minute: 60 },
    { year: 1982, month: 12, day: 33 },
    { year: 1982, month: 2, day: 29 },
    { hour: 25 },
    { day: -2 },
    { minute: -1 },
    { second: 60 },
    { millisecond: -2 },
    { millisecond: 2000 },
    { second: -2000, hour: 2 }
  ]
  arr.forEach(obj => {
    t.throws(() => { spacetime(obj) }, JSON.stringify(obj))
  })
  t.end()
})