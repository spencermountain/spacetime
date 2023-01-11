import byYear from './by-year.js'

const addYear = function (structure, tz, year) {
  structure[tz] = structure[tz] || { already: {}, changes: [] }

  // don't re-calculate it
  if (structure[tz].already[year] === true) {
    return structure
  }

  let thisYear = byYear(tz, year)
  let changes = structure[tz].changes.concat(thisYear)
  // sort them
  structure[tz].changes = changes.sort((a, b) => {
    if (a.epoch > b.epoch) {
      return 1
    } else if (a.epoch < b.epoch) {
      return -1
    }
    return 0
  })
  // log that we've added this year
  structure[tz].already[year] = true

  return structure
}
export default addYear