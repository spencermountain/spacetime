import spacetime from '../../src/index.js'

// Fixed inputs cover DST, leap years, and fractional timezone offsets.
const inputs = [
  ['2024-03-09T12:30:00', 'America/New_York'],
  ['2024-11-02T12:30:00', 'America/New_York'],
  ['2024-02-29T09:15:00', 'Asia/Kathmandu'],
  ['2024-10-05T18:45:00', 'Australia/Sydney'],
]
const dates = inputs.map(([input, zone]) => spacetime(input, zone))
const later = dates.map(date => date.add(40, 'day'))
const sum = run => dates.reduce((total, date, i) => total + run(date, i), 0)

// Each invocation does the same amount of work and returns an observable value.
const cases = [
  {
    name: 'parse',
    run: () => inputs.reduce((total, [input, zone]) => {
      return total + spacetime(input, zone).epoch +
        spacetime([2024, 1, 29, 12, 30], zone).epoch +
        spacetime(1709213400000, zone).epoch +
        spacetime('March 1 2024 3:22pm', zone).epoch
    }, 0),
  },
  {
    name: 'format',
    run: () => sum(date => date.format('iso').length +
      date.format('{day-short} {month} {date-ordinal}, {time}').length),
  },
  {
    name: 'arithmetic',
    run: () => sum(date => date.add(2, 'day').subtract(1, 'month').hour(9).epoch),
  },
  {
    name: 'timezone',
    run: () => sum(date => date.goto('Europe/London').hour() +
      date.goto('America/Los_Angeles').hour() + date.timezone('Asia/Tokyo').epoch),
  },
  {
    name: 'boundaries',
    run: () => sum(date => date.startOf('week').epoch + date.endOf('month').epoch),
  },
  {
    name: 'compare',
    run: () => sum((date, i) => date.diff(later[i], 'days') +
      Number(date.isBefore(later[i])) + Number(date.isSame(later[i], 'month'))),
  },
]

export default cases
