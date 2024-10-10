//git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
export function isLeapYear(year) { return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 }
// unsurprisingly-nasty `typeof date` call
export function isDate(d) { return Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf()) }
export function isArray(input) { return Object.prototype.toString.call(input) === '[object Array]' }
export function isObject(input) { return Object.prototype.toString.call(input) === '[object Object]' }
export function isBoolean(input) { return Object.prototype.toString.call(input) === '[object Boolean]' }

export function zeroPad(str, len = 2) {
  let pad = '0'
  str = str + ''
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str
}

export function titleCase(str) {
  if (!str) {
    return ''
  }
  return str[0].toUpperCase() + str.substr(1)
}

export function ordinal(i) {
  let j = i % 10
  let k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

//strip 'st' off '1st'..
export function toCardinal(str) {
  str = String(str)
  str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1')
  return parseInt(str, 10)
}

//used mostly for cleanup of unit names, like 'months'
export function normalize(str = '') {
  str = str.toLowerCase().trim()
  str = str.replace(/ies$/, 'y') //'centuries'
  str = str.replace(/s$/, '')
  str = str.replace(/-/g, '')
  if (str === 'day' || str === 'days') {
    return 'date'
  }
  if (str === 'min' || str === 'mins') {
    return 'minute'
  }
  return str
}

export function getEpoch(tmp) {
  //support epoch
  if (typeof tmp === 'number') {
    return tmp
  }
  //suport date objects
  if (isDate(tmp)) {
    return tmp.getTime()
  }
  // support spacetime objects
  if (tmp.epoch || tmp.epoch === 0) {
    return tmp.epoch
  }
  return null
}

//make sure this input is a spacetime obj
export function beADate(d, s) {
  if (isObject(d) === false) {
    return s.clone().set(d)
  }
  return d
}

export function formatTimezone(offset, delimiter = '') {
  const sign = offset > 0 ? '+' : '-'
  const absOffset = Math.abs(offset)
  const hours = zeroPad(parseInt('' + absOffset, 10))
  const minutes = zeroPad((absOffset % 1) * 60)
  return `${sign}${hours}${delimiter}${minutes}`
}
