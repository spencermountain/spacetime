import { formatTimezone } from '../fns.js'
import { warn, isoCalendar, incomplete } from './temporal-calendar.js'

// Legacy fractional Etc/GMT zones need a native fixed-offset identifier.
const temporalZone = s => {
  const match = s.tz.match(/^etc\/gmt([+-][0-9]+(?:\.[0-9]+)?)$/i)
  return match ? formatTimezone(-Number(match[1]), ':') : s.timezone().name
}

const inputTimezone = input => {
  const T = globalThis.Temporal
  return T && input instanceof T.ZonedDateTime ? input.timeZoneId : undefined
}

const parseTemporal = (s, input) => {
  const T = globalThis.Temporal
  if (!T) {
    return null
  }
  if (input instanceof T.ZonedDateTime || input instanceof T.Instant) {
    if (input instanceof T.ZonedDateTime) {
      input = isoCalendar(s, input)
    }
    if (input.epochNanoseconds % 1000000n !== 0n) {
      warn(s, 'Temporal sub-millisecond precision discarded; use spacetime/temporal to preserve it')
    }
    s.epoch = input.epochMilliseconds
    const native = input instanceof T.Instant ? input.toZonedDateTimeISO(temporalZone(s)) : input.withTimeZone(temporalZone(s))
    if (Math.round(s.offset() * 60000000000) !== native.offsetNanoseconds) {
      warn(s, 'Spacetime timezone rules differ from Temporal at this instant; use spacetime/temporal for native wall-clock values')
    }
    return s
  }
  if (input instanceof T.PlainDate || input instanceof T.PlainDateTime) {
    return parseTemporal(s, isoCalendar(s, input).toZonedDateTime(temporalZone(s)))
  }
  if (incomplete(input, T)) {
    warn(s, 'Temporal input requires a complete date; convert it to a PlainDateTime or ZonedDateTime first')
    s.epoch = null
    return s
  }
  return null
}

const toTemporal = s => {
  const T = globalThis.Temporal
  if (!T) {
    throw new Error('toTemporal() requires native Temporal (or a globally installed polyfill)')
  }
  if (!s.isValid()) {
    return null
  }
  return T.Instant.fromEpochMilliseconds(Math.trunc(s.epoch)).toZonedDateTimeISO(temporalZone(s))
}

export { parseTemporal, inputTimezone, toTemporal }
