import { parseTemporal } from './temporal.ts'
import { isObject } from '../fns.ts'
import fns, { getDefaults } from './helpers.ts'
const { parseArray, parseObject, parseNumber, objectTimezone } = fns
import namedDates from './named-dates.ts'
import normalize from './normalize.ts'
import parseString from './parse.ts'
import findTz from '../timezone/find.ts'
import type { Spacetime, SpacetimeInput, DateParts } from '../types/index.ts'
//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

//find the epoch from different input styles
const parseInput = (s: Spacetime, input: SpacetimeInput, timezone?: string): Spacetime => {
  //if we've been given a epoch number, it's easy
  if (typeof input === 'number') {
    return parseNumber(s, input)
  }
  const today = s._today || getDefaults()
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
  // Date constructors differ across frames and VM contexts.
  if (Object.prototype.toString.call(input) === '[object Date]') {
    s.epoch = (input as Date).getTime()
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
      // a plain object may carry any spelling of the name, like 'Asia/Kolkata', under either key
      // (it is checked even when a timezone given beside the input is shown instead)
      const zone = objectTimezone(input, 'tz', 'timezone')
      if (zone !== undefined) {
        const found = findTz(zone, s.timezones)
        if (timezone == null) {
          s.tz = found
        }
      }
      return s
    }
    const obj: DateParts = Object.assign({}, today, input)
    const asked = s.tz
    s = parseObject(s, obj)
    // the object's own timezone only sets the moment, beside a given one
    if (timezone != null && s.tz !== asked) {
      s.tz = asked
    }
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
  return parseString(s, input, timezone != null)
}
export default parseInput
