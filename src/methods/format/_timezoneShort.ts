import isoOffset from './_offset.ts'
import type { Spacetime } from '../../types/index.ts'

const timezoneShort = (s: Spacetime): string => {
  const offset = isoOffset(s)
  const fallback = offset === 'Z' ? 'UTC' : `UTC${offset}`
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat !== 'function') {
    return fallback
  }
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: s.timezone().name,
      timeZoneName: 'short'
    })
    const name = formatter.formatToParts(s.epoch).find((part) => part.type === 'timeZoneName')
    return name?.value || fallback
  } catch {
    // Custom zones and fractional fixed offsets may not be supported by Intl.
    return fallback
  }
}

export default timezoneShort
