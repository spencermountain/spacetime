import monthLengths from '../../data/monthLengths.js'
import { isLeapYear } from '../../fns.js'
import { mapping } from '../../data/months.js'
let months = mapping()

import parseOffset from './parseOffset.js'
import parseTime from './parseTime.js'

//given a month, return whether day number exists in it
const validate = (obj) => {
  //invalid values
  if (monthLengths.hasOwnProperty(obj.month) !== true) {
    return false
  }
  //support leap-year in february
  if (obj.month === 1) {
    if (isLeapYear(obj.year) && obj.date <= 29) {
      return true
    } else {
      return obj.date <= 28
    }
  }
  //is this date too-big for this month?
  let max = monthLengths[obj.month] || 0
  if (obj.date <= max) {
    return true
  }
  return false
}

const parseYear = (str = '', today) => {
  str = str.trim()
  // parse '86 shorthand
  if (/^'[0-9][0-9]$/.test(str) === true) {
    let num = Number(str.replace(/'/, ''))
    if (num > 50) {
      return 1900 + num
    }
    return 2000 + num
  }
  let year = parseInt(str, 10)
  // use a given year from options.today
  if (!year && today) {
    year = today.year
  }
  // fallback to this year
  year = year || new Date().getFullYear()
  return year
}

const parseMonth = function (str) {
  str = str.toLowerCase().trim()
  if (str === 'sept') {
    return months.sep
  }
  return months[str]
}

export {
  parseOffset,
  parseTime,
  parseYear,
  parseMonth,
  validate
}