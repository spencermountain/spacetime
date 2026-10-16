// Tabular Islamic civil calendar: Friday epoch, 30-year leap-year cycle.
// Dates are daytime civil dates, not the preceding sunset or local sightings.
const epoch = 1948439.5
const unixEpoch = 2440587.5
const dayMs = 86400000

const toJulianDay = (year, month, day) => {
  return epoch - 1 + day + Math.ceil(29.5 * (month - 1)) +
    (year - 1) * 354 + Math.floor((3 + 11 * year) / 30)
}

const occurrences = (year, month, day) => {
  if (!Number.isInteger(year) || year < 622 || year > 9999) {
    return []
  }
  const january = Date.UTC(year, 0, 1) / dayMs + unixEpoch
  const islamicYear = Math.floor((30 * (january - epoch) + 10646) / 10631)
  const dates = []
  for (let candidate = Math.max(1, islamicYear); candidate <= islamicYear + 2; candidate += 1) {
    const date = new Date((toJulianDay(candidate, month, day) - unixEpoch) * dayMs)
    if (date.getUTCFullYear() === year) {
      dates.push([year, date.getUTCMonth(), date.getUTCDate()])
    }
  }
  return dates
}

export default occurrences
