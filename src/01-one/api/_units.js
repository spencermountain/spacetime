const mapping = {
  milliseconds: 'millisecond',
  ms: 'millisecond',
  seconds: 'second',
  s: 'second',
  minutes: 'minute',
  min: 'minute',
  mins: 'minute',
  hours: 'hour',
  h: 'hour',
  hr: 'hour',
  dates: 'date',
  day: 'date',
  days: 'date',
  months: 'month',
  years: 'year',
  quarters: 'quarter',
  centuries: 'century',
  millenia: 'millenium',
}
const order = [
  'millenium',
  'century',
  'decade',
  'year',
  'quarter',
  'month',
  'week',
  'date',
  'hour',
  'minute',
  'second',
  'millisecond',
]
const isKnown = new Set(order)

const getUnit = function (input = '') {
  if (typeof input !== 'string') {
    input = String(input)
  }
  input = input.toLowerCase().trim()
  if (mapping.hasOwnProperty(input)) {
    input = mapping[input]
  }
  if (isKnown.has(input)) {
    return input
  }
  console.error(`Unknown unit: '${input}'`)
  return null
}

export { getUnit, order }