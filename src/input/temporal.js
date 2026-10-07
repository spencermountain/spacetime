import { formatTimezone } from '../fns.js'

// Legacy fractional Etc/GMT zones need a native fixed-offset identifier.
const temporalZone = s => {
  const match = s.tz.match(/^etc\/gmt([+-][0-9]+(?:\.[0-9]+)?)$/i)
  return match ? formatTimezone(-Number(match[1]), ':') : s.tz
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
    s.epoch = input.epochMilliseconds
    return s
  }
  if (input instanceof T.PlainDate || input instanceof T.PlainDateTime) {
    s.epoch = input.toZonedDateTime(temporalZone(s)).epochMilliseconds
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
