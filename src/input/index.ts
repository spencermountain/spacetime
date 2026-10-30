import { parseTemporal } from './temporal.ts'
import { isObject } from '../fns.ts'
import fns from './helpers.ts'
const { parseArray, parseObject, parseNumber } = fns
import namedDates from './named-dates.ts'
import normalize from './normalize.ts'
import parseString from './parse.ts'
import type { Spacetime, SpacetimeInput, DateParts } from '../types/index.ts'
//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

const defaults: DateParts = {
  year: new Date().getFullYear(),
  month: 0,
  date: 1
}

//find the epoch from different input styles
const parseInput = (s: Spacetime, input: SpacetimeInput, timezone?: string): Spacetime => {
  const today = s._today || defaults
  //if we've been given a epoch number, it's easy
  if (typeof input === 'number') {
    return parseNumber(s, input)
  }
  //set tmp time
  s.epoch = Date.now()
  // overwrite tmp time with 'today' value, if exists
  if (s._today && isObject(s._today) && Object.keys(s._today).length > 0) {
    const res = parseObject(s, today)
    if (res.isValid()) {
      s.epoch = res.epoch
    }
  }
  // null input means 'now'
  if (input === null || input === undefined || input === '') {
    return s //k, we're good.
  }
  const native = parseTemporal(s, input)
  if (native) {
    return native
  }
  //support input of Date() object
  if (input instanceof Date) {
    s.epoch = input.getTime()
    return s
  }
  //support [2016, 03, 01] format
  if (Array.isArray(input)) {
    s = parseArray(s, input, today)
    return s
  }
  //support {year:2016, month:3} format
  if (isObject(input)) {
    //support spacetime object as input
    if ('epoch' in input) {
      s.epoch = typeof input.epoch === 'number' ? input.epoch : NaN
      if (timezone == null && 'tz' in input && input.tz) {
        s.tz = input.tz
      }
      return s
    }
    const obj: DateParts = Object.assign({}, today, input)
    s = parseObject(s, obj)
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
