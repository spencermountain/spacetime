import c from '../data/countries.js'
import iana from '../../zonefile/iana.js'
const firstDay = c.firstDay()
const loc = c.locations()

function getCountry(country) {
  for (const day in firstDay) {
    if (firstDay.hasOwnProperty(day)) {
      for (const key in firstDay[day]) {
        if (firstDay[day].hasOwnProperty(key)) {
          if ((key === country) || (firstDay[day][key].indexOf(country) !== -1)) {
            return { day: day, country: firstDay[day][key] }
          }
        }
      }
    }
  }
  for (const item in loc) {
    if (loc.hasOwnProperty(item) && loc[item].indexOf(country) !== -1) {
      return { day: 'monday', location: country }
    }
  }
  return {}
}

// find a week-start for an iana timezone name, like 'europe/berlin'
function getCurrent(tz) {
  if (!tz || typeof tz !== 'string') {
    return null
  }
  tz = tz.toLowerCase()
  const zone = iana[tz]
  if (!zone) {
    return null
  }
  if (zone.loc) {
    return getCountry(zone.loc)
  }
  if (zone.ctry) {
    return getCountry(zone.ctry)
  }
  // otherwise, guess from the timezone name itself
  let found = getCountry(tz.substr(0, tz.indexOf('/')))
  if (found.day) {
    return found
  }
  found = getCountry(tz.substr(tz.indexOf('/') + 1).replace('_', ' '))
  if (found.day) {
    return found
  }
  return null
}

function getWeekStart(country, tz) {
  // try a country-name lookup first
  if (country && typeof country === 'string') {
    const found = getCountry(country.toLowerCase().trim())
    if (found.day) {
      return found
    }
  }
  // otherwise, use the given timezone
  return getCurrent(tz)
}

export { getWeekStart }
