import data from './season-data.js'

const names = ['spring', 'summer', 'fall', 'winter']
const seasons = (year) => {
  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    return null
  }
  const events = {}
  for (let index = 0; index < names.length; index += 1) {
    events[names[index]] = Date.UTC(year, index * 3 + 2, 1) + data[year - 2000][index] * 60000
  }
  return events
}

export default seasons
