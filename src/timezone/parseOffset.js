const offsetPattern = /^(?:(utc|gmt)\s*)?([+-]?)(\d+)(?:(\.\d+)|:([0-5]\d))?(?:\s*(?:h|hrs?|hours?))?$/i
const embeddedHours = /(?:^|\s)([+-]?\d+(?:\.\d+|:[0-5]\d)?\s*(?:h|hrs?|hours?))$/i

const parseOffset = (tz) => {
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
  // Fixed-offset entries exist in quarter-hour steps up to UTC±14.
  if (num > 14 || !Number.isInteger(num * 4)) {
    return null
  }
  if (sign === '-') {
    num *= -1
  }
  // Preserve the existing GMT convention; UTC and bare offsets use normal signs.
  if (prefix?.toLowerCase() !== 'gmt') {
    num *= -1
  }
  return 'etc/gmt' + (num > 0 ? '+' : '') + num
}

export default parseOffset
