//git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
exports.isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
// unsurprisingly-nasty `typeof date` call
exports.isDate = (d) => Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf())
exports.isArray = (input) => Object.prototype.toString.call(input) === '[object Array]'
exports.isObject = (input) => Object.prototype.toString.call(input) === '[object Object]'
exports.isBoolean = (input) => Object.prototype.toString.call(input) === '[object Boolean]'

exports.zeroPad = (str, len = 2) => {
  let pad = '0'
  str = str + ''
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str
}

exports.titleCase = (str) => {
  if (!str) {
    return ''
  }
  return str[0].toUpperCase() + str.substr(1)
}

exports.ordinal = (i) => {
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
exports.toCardinal = (str) => {
  str = String(str)
  str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1')
  return parseInt(str, 10)
}

//used mostly for cleanup of unit names, like 'months'
exports.normalize = (str = '') => {
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

exports.getEpoch = (tmp) => {
  //support epoch
  if (typeof tmp === 'number') {
    return tmp
  }
  //suport date objects
  if (exports.isDate(tmp)) {
    return tmp.getTime()
  }
  if (tmp.epoch) {
    return tmp.epoch
  }
  return null
}

//make sure this input is a spacetime obj
exports.beADate = (d, s) => {
  if (exports.isObject(d) === false) {
    return s.clone().set(d)
  }
  return d
}

exports.formatTimezone = (offset, delimiter = '') => {
  const sign = offset > 0 ? '+' : '-'
  const absOffset = Math.abs(offset)
  const hours = exports.zeroPad(parseInt('' + absOffset, 10))
  const minutes = exports.zeroPad((absOffset % 1) * 60)
  return `${sign}${hours}${delimiter}${minutes}`
}
