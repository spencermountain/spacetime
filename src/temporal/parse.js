import ymd from '../input/formats/01-ymd.js'
import mdy from '../input/formats/02-mdy.js'
import dmy from '../input/formats/03-dmy.js'
import misc from '../input/formats/04-misc.js'
import normalize from '../input/normalize.js'
import namedDates from '../input/named-dates.js'
import { fields, temporal, fieldValues } from './_lib.js'

const walkTo = (s, input) => {
  s._pending = s._clock.with(fieldValues(input))
}

const parseOffset = (s, offset) => {
  if (offset) {
    offset = offset.trim().toUpperCase()
    if (offset === 'Z') {
      offset = 'UTC'
    } else {
      offset = offset.replace(/^([+-][0-9]{2})([0-9]{2})$/, '$1:$2')
      if (/^[+-][0-9]{2}$/.test(offset)) {
        offset += ':00'
      }
    }
    s._tz = offset
  }
  return s
}
const parsers = [...ymd(walkTo, parseOffset), ...mdy(walkTo, parseOffset), ...dmy(walkTo), ...misc(walkTo)]

const parse = (s, input) => {
  const T = temporal()
  if (input instanceof T.ZonedDateTime) {
    s._value = input.withCalendar('iso8601').withTimeZone(s.tz)
  } else if (input instanceof T.Instant) {
    s._value = input.toZonedDateTimeISO(s.tz)
  } else if (input instanceof T.PlainDate || input instanceof T.PlainDateTime) {
    s._value = input.toZonedDateTime(s.tz)
  } else if (input instanceof Date) {
    s.epoch = input.getTime()
  } else if (typeof input === 'number') {
    s.epoch = input
  } else if (input && typeof input === 'object' && 'epoch' in input) {
    s._tz = input.tz || s.tz
    if (input._value instanceof T.ZonedDateTime) {
      s._value = input._value
    } else {
      s.epoch = input.epoch
    }
  } else if (Array.isArray(input) || (input && typeof input === 'object')) {
    let obj = input
    if (Array.isArray(input)) {
      obj = Object.fromEntries(fields.map((key, i) => [key, input[i]]).filter(([, value]) => value !== undefined))
    }
    const values = { year: s.year(), month: 0, date: 1, ...s._today, ...obj }
    s._tz = values.timezone || s.tz
    s._value = T.ZonedDateTime.from({ timeZone: s.tz, ...fieldValues(values) })
  } else if (typeof input === 'string' && input) {
    // Native ISO parsing preserves an explicit offset in a repeated DST hour.
    if (/^[+-]?[0-9]{4,6}-[0-9]{2}-[0-9]{2}T[^[]*\[[^[\]]+\](?:\[[^[\]]+\])?$/i.test(input)) {
      s._value = T.ZonedDateTime.from(input).withCalendar('iso8601')
      s._tz = s._value.timeZoneId
      return s
    }
    const str = normalize(input)
    if (Object.hasOwn(namedDates, str)) {
      return namedDates[str](s)
    }
    // Collect wall-clock fields before resolving a gap or repeated hour once.
    s._pending = s._value.toPlainDateTime()
    for (let i = 0; i < parsers.length; i++) {
      const match = str.match(parsers[i].reg)
      if (match) {
        const result = parsers[i].parse(s, match)
        if (result && result.isValid()) {
          result._value = result._pending.toZonedDateTime(result.tz)
          result._pending = null
          return result
        }
      }
    }
    s.epoch = null
  } else if (input !== null && input !== undefined && input !== '') {
    s.epoch = null
  }
  return s
}

export default parse
