import parsers from './formats/index.ts'
import parseOffset from './formats/parseOffset.ts'
import parseTime from './formats/parseTime.ts'
import walkTo from '../methods/set/walk.ts'
import type { ParsedDate } from './formats/_parsers.ts'
import type { Spacetime } from '../types/index.ts'

// set a parsed date onto an instance
const apply = (s: Spacetime, parsed: ParsedDate): Spacetime => {
  if (parsed.timezone) {
    s = s.timezone(parsed.timezone)
  } else if (parsed.offset) {
    s = parseOffset(s, parsed.offset)
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
  return s
}

const parseString = function (s: Spacetime, input: string): Spacetime {
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
