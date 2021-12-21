import { isObject, isDate, isArray } from '../fns.js'
import fns from './helpers.js'
const { parseArray, parseObject, parseNumber } = fns
import namedDates from './named-dates.js'
import normalize from './normalize.js'
import parseString from './parse.js'
//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

const defaults = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1
}

//find the epoch from different input styles
const parseInput = (s, input) => {
  let today = s._today || defaults
  //if we've been given a epoch number, it's easy
  if (typeof input === 'number') {
    return parseNumber(s, input)
  }
  //set tmp time
  s.epoch = Date.now()
  // overwrite tmp time with 'today' value, if exists
  if (s._today && isObject(s._today) && Object.keys(s._today).length > 0) {
    let res = parseObject(s, today, defaults)
    if (res.isValid()) {
      s.epoch = res.epoch
    }
  }
  // null input means 'now'
  if (input === null || input === undefined || input === '') {
    return s //k, we're good.
  }
  //support input of Date() object
  if (isDate(input) === true) {
    s.epoch = input.getTime()
    return s
  }
  //support [2016, 03, 01] format
  if (isArray(input) === true) {
    s = parseArray(s, input, today)
    return s
  }
  //support {year:2016, month:3} format
  if (isObject(input) === true) {
    //support spacetime object as input
    if (input.epoch) {
      s.epoch = input.epoch
      s.tz = input.tz
      return s
    }
    s = parseObject(s, input, today)
    return s
  }
  //input as a string..
  if (typeof input !== 'string') {
    return s
  }
  //little cleanup..
  input = normalize(input)
  //try some known-words, like 'now'
  if (namedDates.hasOwnProperty(input) === true) {
    s = namedDates[input](s)
    return s
  }
  //try each text-parse template, use the first good result
  return parseString(s, input)
}
export default parseInput
