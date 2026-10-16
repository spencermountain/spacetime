import test from 'tape'
import spacetime from '../_lib/index.js'

test('partial calendar inputs distinguish omitted fields from zero', t => {
  const today = { year: 2024, month: 5, date: 15, hour: 12, minute: 34, second: 56, millisecond: 789 }
  const options = { today }
  const snapshot = JSON.stringify(today)
  const cases = [
    ['empty object', {}, today],
    ['empty array', [], today],
    ['midnight hour', { hour: 0 }, { ...today, hour: 0 }],
    ['January', { month: 0 }, { ...today, month: 0 }],
    ['zero minute', { minute: 0 }, { ...today, minute: 0 }],
    ['zero second', { second: 0 }, { ...today, second: 0 }],
    ['zero millisecond', { millisecond: 0 }, { ...today, millisecond: 0 }],
    ['year only', [2025], { ...today, year: 2025 }],
    ['January array', [2024, 0], { ...today, month: 0 }],
    ['January first array', [2024, 0, 1], { ...today, month: 0, date: 1 }],
    ['midnight array', [2024, 0, 1, 0, 0, 0, 0], { year: 2024, month: 0, date: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }]
  ]
  cases.forEach(([label, input, expected]) => {
    const epoch = Date.UTC(expected.year, expected.month, expected.date, expected.hour, expected.minute, expected.second, expected.millisecond)
    const inputSnapshot = JSON.stringify(input)
    t.equal(spacetime(input, 'UTC', options).epoch, epoch, `${label}: supplied fields override today`)
    t.equal(spacetime(null, 'UTC', options).set(input).epoch, epoch, `${label}: set uses the same defaults`)
    t.equal(JSON.stringify(input), inputSnapshot, `${label}: input unchanged`)
    t.equal(JSON.stringify(today), snapshot, `${label}: today unchanged`)
  })
  t.end()
})
