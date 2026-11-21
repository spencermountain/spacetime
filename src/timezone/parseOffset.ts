import { fixedName } from './fixed.ts'

const offsetPattern = /^(?:(?:etc|utc)\/)?(?:(utc|gmt)\s*)?([+-]?)(\d+)(?:(\.\d+)|:([0-5]\d))?(?:\s*(?:h|hrs?|hours?))?$/i
const embeddedHours = /(?:^|\s)([+-]?\d+(?:\.\d+|:[0-5]\d)?\s*(?:h|hrs?|hours?))$/i

// turn '-5h', 'utc+5:30', 'gmt-3' into a fixed-offset zone id, like 'etc/gmt+5' or '+05:30'
// (and older ids like 'etc/gmt-5.5')
const parseOffset = (tz: string): string | null => {
  const input = tz.trim()
  let match = input.match(offsetPattern)
  if (!match) {
    // Retain loose hour-suffix inputs such as 'prefix -5hrs'.
    const embedded = input.match(embeddedHours)
    if (embedded) {
      match = embedded[1].match(offsetPattern)
    }
  }
  if (!match) {
    return null
  }
  const [, prefix, sign, hours, fraction = '0', minutes = '0'] = match
  let num = Number(hours) + Number(fraction) + Number(minutes) / 60
  if (sign === '-') {
    num *= -1
  }
  // Preserve the existing GMT convention, where the sign is reversed; UTC and bare offsets use normal signs.
  if (prefix != null && prefix.toLowerCase() === 'gmt') {
    num *= -1
  }
  return fixedName(num)
}

export default parseOffset
