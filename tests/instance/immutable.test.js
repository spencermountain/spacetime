import test from 'tape'
import spacetime from '../_lib/index.js'

const input = '2020-01-15T08:30:00.001Z'
const zone = 'UTC'

test('clone preserves the instant in a separate object', (t) => {
  const original = spacetime(input, zone)
  const copy = original.clone()
  t.notEqual(copy, original, `${input} ${zone}: clone returns a separate object`)
  t.equal(copy.epoch, Date.parse(input), `${input} ${zone}: clone preserves milliseconds`)
  t.equal(copy.tz, original.tz, `${input} ${zone}: clone preserves timezone`)
  t.end()
})

test('operations leave the original unchanged', (t) => {
  const cases = [
    ['add(1, day)', s => s.add(1, 'day'), '2020-01-16T08:30:00.001Z'],
    ['subtract(1, day)', s => s.subtract(1, 'day'), '2020-01-14T08:30:00.001Z'],
    ['hour(1)', s => s.hour(1), '2020-01-15T01:30:00.001Z'],
    ['date(1).month(1).year(2018)', s => s.date(1).month(1).year(2018), '2018-02-01T08:30:00.001Z'],
    ['day(22)', s => s.day(22), '2020-02-03T08:30:00.001Z'],
    ['month(7)', s => s.month(7), '2020-08-15T08:30:00.001Z'],
    ['quarter(4)', s => s.quarter(4), '2020-10-01T00:00:00.000Z'],
    ['goto(Australia/Brisbane)', s => s.goto('Australia/Brisbane'), '2020-01-15T18:30:00.001+10:00']
  ]
  cases.forEach(([operation, apply, expected]) => {
    const original = spacetime(input, zone)
    const originalZone = original.tz
    const result = apply(original)
    const label = `${input} ${zone}: ${operation}`
    t.equal(original.epoch, Date.parse(input), `${label} preserves the original instant`)
    t.equal(original.tz, originalZone, `${label} preserves the original timezone`)
    t.notEqual(result, original, `${label} returns a separate object`)
    t.equal(result.iso(), expected, `${label} produces the expected datetime`)
  })
  t.end()
})

test('time setting works', (t) => {
  t.equal(spacetime(input, zone).time('6:00pm').time(), '6:00pm', `${input} ${zone}: time(6:00pm)`)
  t.end()
})

test('setters return the requested value without mutating', (t) => {
  const cases = [
    ['add', [3, 'days'], 'date', 18],
    ['ampm', ['pm'], 'ampm', 'pm'],
    ['date', [12], 'date', 12],
    ['day', ['thursday'], 'dayName', 'thursday'],
    ['dayName', ['monday'], 'dayName', 'monday'],
    ['dayOfYear', [23], 'dayOfYear', 23],
    ['dayTime', ['evening'], 'dayTime', 'evening'],
    ['era', ['bc'], 'year', -2020],
    ['hour', [4], 'hour', 4],
    ['hour12', ['9am'], 'hour', 9],
    ['hourFloat', [2], 'hourFloat', 2],
    ['millisecond', [234], 'millisecond', 234],
    ['minute', [3], 'minute', 3],
    ['month', [1], 'month', 1],
    ['monthName', ['july'], 'monthName', 'july'],
    ['quarter', [2], 'quarter', 2],
    ['season', ['summer'], 'season', 'summer'],
    ['second', [23], 'second', 23],
    ['subtract', [12, 'hours'], 'date', 14],
    ['time', ['4:24pm'], 'time', '4:24pm'],
    ['week', [4], 'week', 4],
    ['year', [1982], 'year', 1982]
  ]
  cases.forEach(([method, args, getter, expected]) => {
    const original = spacetime(input, zone)
    const result = original[method](...args)
    const label = `${input} ${zone}: ${method}(${args.join(', ')})`
    t.equal(original.epoch, Date.parse(input), `${label} preserves the original instant`)
    t.notEqual(result, original, `${label} returns a separate object`)
    t.equal(result[getter](), expected, `${label} sets ${getter}`)
  })
  t.end()
})

test('boolean methods identical', (t) => {
  const r = spacetime(1552124200401)
  const r2 = spacetime(1552145200401)
  const arr = [
    ['isSame', r, 'day', true],
    ['isAfter', r, 'day', false],
    ['isBefore', r, 'day', true],
    ['isEqual', r, 'day', false],
    ['isBetween', r, r2, false]
  ]
  arr.forEach((a) => {
    const immut = spacetime(1552114800001)
    const fn = a[0]
    const one = immut[fn](a[1], a[2])
    t.equal(one, a[3], fn + ' equal')
  })
  t.end()
})
