let shortMonths = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sept',
  'oct',
  'nov',
  'dec'
]
let longMonths = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]

function buildMapping() {
  const obj = {
    sep: 8 //support this format
  }
  for (let i = 0; i < shortMonths.length; i++) {
    obj[shortMonths[i]] = i
  }
  for (let i = 0; i < longMonths.length; i++) {
    obj[longMonths[i]] = i
  }
  return obj
}

module.exports = {
  short: () => shortMonths,
  long: () => longMonths,
  mapping: () => buildMapping(),
  set: i18n => {
    shortMonths = i18n.short || shortMonths
    longMonths = i18n.long || longMonths
  }
}
