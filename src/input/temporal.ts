import { formatTimezone } from '../fns.ts'
import { warn, isoCalendar, incomplete } from './temporal-calendar.ts'
import type { Spacetime } from '../types/index.ts'

// the Temporal global, when the runtime has one (node 26+, or a polyfill)
const getTemporal = (): typeof Temporal | undefined => (typeof globalThis === 'undefined' ? undefined : globalThis.Temporal)

// Legacy fractional Etc/GMT zones need a native fixed-offset identifier.
const temporalZone = (s: Spacetime): string => {
  const match = s.tz.match(/^etc\/gmt([+-][0-9]+(?:\.[0-9]+)?)$/i)
  return match ? formatTimezone(-Number(match[1]), ':') : s.timezone().name
}

const inputTimezone = (input: unknown): string | undefined => {
  const T = getTemporal()
  return T && input instanceof T.ZonedDateTime ? input.timeZoneId : undefined
}

const parseTemporal = (s: Spacetime, input: unknown): Spacetime | null => {
  const T = getTemporal()
  if (!T) {
    return null
  }
  if (input instanceof T.ZonedDateTime || input instanceof T.Instant) {
    const value = input instanceof T.ZonedDateTime ? isoCalendar(s, input) : input
    if (value.epochNanoseconds % 1000000n !== 0n) {
      warn(s, 'Temporal sub-millisecond precision discarded; use spacetime/temporal to preserve it')
    }
    s.epoch = value.epochMilliseconds
    const native = value instanceof T.Instant ? value.toZonedDateTimeISO(temporalZone(s)) : value.withTimeZone(temporalZone(s))
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

const toTemporal = (s: Spacetime): Temporal.ZonedDateTime | null => {
  const T = getTemporal()
  if (!T) {
    throw new Error('toTemporal() requires native Temporal (or a globally installed polyfill)')
  }
  if (!s.isValid()) {
    return null
  }
  return T.Instant.fromEpochMilliseconds(Math.trunc(s.epoch)).toZonedDateTimeISO(temporalZone(s))
}

export { parseTemporal, inputTimezone, toTemporal }
