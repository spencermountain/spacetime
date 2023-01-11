let shortMonths = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
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

export function short() { return shortMonths }
export function long() { return longMonths }
export function mapping() { return buildMapping() }
export function set(i18n) {
  shortMonths = i18n.short || shortMonths
  longMonths = i18n.long || longMonths
}
