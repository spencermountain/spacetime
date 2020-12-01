const strFmt = require('./strParse')
const fns = require('../fns')
const namedDates = require('./named-dates')
//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

//-- also -
// if the given epoch is really small, they've probably given seconds and not milliseconds
// anything below this number is likely (but not necessarily) a mistaken input.
// this may seem like an arbitrary number, but it's 'within jan 1970'
// this is only really ambiguous until 2054 or so
const minimumEpoch = 2500000000

const defaults = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1
}

//support [2016, 03, 01] format
const handleArray = (s, arr, today) => {
  if (arr.length === 0) {
    return s
  }
  let order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
  for (let i = 0; i < order.length; i++) {
    let num = arr[i] || today[order[i]] || defaults[order[i]] || 0
    s = s[order[i]](num)
  }
  return s
}
//support {year:2016, month:3} format
const handleObject = (s, obj, today) => {
  // if obj is empty, do nothing
  if (Object.keys(obj).length === 0) {
    return s
  }
  obj = Object.assign({}, defaults, today, obj)
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    let unit = keys[i]
    //make sure we have this method
    if (s[unit] === undefined || typeof s[unit] !== 'function') {
      continue
    }
    //make sure the value is a number
    if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
      continue
    }
    let num = obj[unit] || today[unit] || defaults[unit] || 0
    s = s[unit](num)
  }
  return s
}

//find the epoch from different input styles
const parseInput = (s, input, givenTz) => {
  let today = s._today || defaults
  //if we've been given a epoch number, it's easy
  if (typeof input === 'number') {
    if (input > 0 && input < minimumEpoch && s.silent === false) {
      console.warn('  - Warning: You are setting the date to January 1970.')
      console.warn('       -   did input seconds instead of milliseconds?')
    }
    s.epoch = input
    return s
  }
  //set tmp time
  s.epoch = Date.now()
  // overwrite tmp time with 'today' value, if exists
  if (s._today && fns.isObject(s._today) && Object.keys(s._today).length > 0) {
    let res = handleObject(s, today, defaults)
    if (res.isValid()) {
      s.epoch = res.epoch
    }
  }
  // null input means 'now'
  if (input === null || input === undefined || input === '') {
    return s //k, we're good.
  }
  //support input of Date() object
  if (fns.isDate(input) === true) {
    s.epoch = input.getTime()
    return s
  }
  //support [2016, 03, 01] format
  if (fns.isArray(input) === true) {
    s = handleArray(s, input, today)
    return s
  }
  //support {year:2016, month:3} format
  if (fns.isObject(input) === true) {
    //support spacetime object as input
    if (input.epoch) {
      s.epoch = input.epoch
      s.tz = input.tz
      return s
    }
    s = handleObject(s, input, today)
    return s
  }
  //input as a string..
  if (typeof input !== 'string') {
    return s
  }
  //little cleanup..
  input = input.replace(/\b(mon|tues|wed|wednes|thu|thurs|fri|sat|satur|sun)(day)?\b/i, '')
  input = input.replace(/,/g, '')
  input = input.replace(/ +/g, ' ').trim()
  //try some known-words, like 'now'
  if (namedDates.hasOwnProperty(input) === true) {
    s = namedDates[input](s)
    return s
  }
  //try each text-parse template, use the first good result
  for (let i = 0; i < strFmt.length; i++) {
    let m = input.match(strFmt[i].reg)
    if (m) {
      // console.log(strFmt[i].reg)
      let res = strFmt[i].parse(s, m, givenTz)
      if (res !== null && res.isValid()) {
        return res
      }
    }
  }
  if (s.silent === false) {
    console.warn("Warning: couldn't parse date-string: '" + input + "'")
  }
  s.epoch = null
  return s
}
module.exports = parseInput
