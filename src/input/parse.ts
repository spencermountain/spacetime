import parsers from './formats/index.ts'
import { offsetHours, fixedZone } from './formats/parseOffset.ts'
import parseTime from './formats/parseTime.ts'
import walkTo from '../methods/set/walk.ts'
import type { ParsedDate } from './formats/_parsers.ts'
import type { Spacetime } from '../types/index.ts'

const MSEC_IN_HOUR = 60 * 60 * 1000

// set a parsed date onto an instance
// an offset decides the moment, and a named timezone decides where it is shown
const apply = (s: Spacetime, parsed: ParsedDate): Spacetime => {
  let zone = s.tz
  if (parsed.timezone) {
    s = s.timezone(parsed.timezone)
    zone = s.tz
  }
  // read the clock as utc, and shift it by the offset after
  const offset = offsetHours(parsed.offset)
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
    s.tz = parsed.timezone ? zone : (fixedZone(offset, s.timezones) || zone)
  }
  return s
}

const parseString = function (s: Spacetime, input: string): Spacetime {
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
        const res = apply(s.clone(), parsed)
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
