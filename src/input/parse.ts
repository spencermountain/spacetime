import parsers from './formats/index.ts'
import { offsetHours } from './formats/parseOffset.ts'
import { fixedName } from '../timezone/fixed.ts'
import parseTime from './formats/parseTime.ts'
import walkTo from '../methods/set/walk.ts'
import type { ParsedDate } from './formats/_parsers.ts'
import type { Spacetime } from '../types/index.ts'

const MSEC_IN_HOUR = 60 * 60 * 1000

// set a parsed date onto an instance
// an offset decides the moment, and a named timezone decides where it is shown
// (a timezone given beside the input is shown instead of one written in it)
const apply = (s: Spacetime, parsed: ParsedDate, given: boolean): Spacetime => {
  const asked = s.tz
  let zone = s.tz
  if (parsed.timezone) {
    s = s.timezone(parsed.timezone)
    zone = s.tz
  }
  // read the clock as utc, and shift it by the offset after
  const offset = offsetHours(parsed.offset)
  if (parsed.offset !== undefined && offset === null) {
    s.epoch = null
    return s
  }
  if (offset !== null) {
    s.tz = 'etc/gmt'
  }
  if (parsed.parts) {
    walkTo(s, parsed.parts)
  }
  if (parsed.quarter) {
    s = s.quarter(parsed.quarter)
  }
  if (parsed.season) {
    s = s.season(parsed.season)
  }
  if (parsed.time !== undefined) {
    s = parseTime(s, parsed.time)
  }
  if (offset !== null) {
    if (s.isValid()) {
      s.epoch = Math.round(s.epoch - (offset * MSEC_IN_HOUR))
    }
    // show that moment in its named timezone, or else at the offset it was written in
    if (parsed.timezone) {
      s.tz = zone
    } else if (/^\s*z\s*$/i.test(parsed.offset)) {
      s.tz = 'utc' // 'Z' means utc, not a fixed offset
    } else {
      s.tz = fixedName(offset) || zone
    }
  }
  // the input named its own moment, so only move it to the given timezone
  if (given && (offset !== null || parsed.timezone)) {
    s.tz = asked
  }
  return s
}

const parseString = function (s: Spacetime, input: string, given = false): Spacetime {
  // real names are short; reject any reDos input
  if (input.length > 500) {
    if (s.silent === false) {
      console.warn("Warning: didn't parse long date-string.") // eslint-disable-line no-console
    }
    s.epoch = null
    return s
  }
  //try each text-parse template, use the first good result
  for (let i = 0; i < parsers.length; i++) {
    const m = input.match(parsers[i].reg)
    if (m) {
      const parsed = parsers[i].parse(m, s)
      if (parsed !== null) {
        const res = apply(s.clone(), parsed, given)
        if (res.isValid()) {
          return res
        }
      }
    }
  }
  if (s.silent === false) {
    console.warn("Warning: couldn't parse date-string: '" + input + "'") // eslint-disable-line no-console
  }
  s.epoch = null
  return s
}
export default parseString
