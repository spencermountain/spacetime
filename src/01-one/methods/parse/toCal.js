import formats from './text/index.js'
import { parseMonth } from './text/units/index.js'


// order for Array input
const units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

const isString = val => {
  return typeof val === 'string'
}


const parseText = function (txt, tz) {
  let cal = {}
  // normalize it a bit first
  txt = txt.toLowerCase()
  txt = txt.replace(/([0-9])(th|rd|st|nd)\b/, '$1')
  txt = txt.replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i, '')
  txt = txt.replace(/,/g, '')
  txt = txt.replace(/ +/g, ' ').trim()
  txt = txt.trim()
  for (let i = 0; i < formats.length; i += 1) {
    let m = txt.match(formats[i].reg)
    if (m !== null) {
      // console.log(`reg #${i} - ${formats[i].reg}`)
      let res = formats[i].parse(m)
      if (res) {
        return res
      }
    }
  }
  return cal
}

const toCal = function (input, tz, world) {
  // support ordered array as input [2020, 04, 1] → {year:2020 ...}
  if (isArray(input)) {
    let cal = units.reduce((h, k, i) => {
      h[k] = input[i]
      return h
    }, {})
    if (cal.month) {
      cal.month = parseMonth(cal.month)
    }
    return cal
  }
  // object input - given {year:2020 ...}
  if (input && isObject(input)) {
    // interpret a spacetime object as input
    if (input.isSpacetime === true) {
      return input.clone()
    }
    let cal = Object.assign({}, input)//don't mutate original
    return cal
  }
  // pull-apart ISO formats, etc
  if (isString(input)) {
    let cal = parseText(input)
    // replace tz with iso timezone
    if (cal.offset !== null && cal.offset !== undefined) {
      if (cal.offset < 0) {
        tz = `Etc/GMT+${Math.abs(cal.offset)}`
      } else {
        tz = `Etc/GMT-${cal.offset}`
      }
    }
    return cal
  }
  return {}
}
export default toCal