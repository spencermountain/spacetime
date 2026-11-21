// pull-apart ISO offsets, like "+0100", into hours east of utc
// (null means there is no offset to use)
export const offsetHours = (offset?: string): number | null => {
  if (!offset) {
    return null
  }
  offset = offset.trim().toLowerCase()
  if (offset === 'z') {
    return 0
  }
  // Split hh:mm, hhmm or hh before converting minutes to fractional hours.
  const match = offset.match(/^([+-]?)([0-9]{2})(?::?([0-9]{2}))?$/)
  if (!match) {
    return null
  }
  const hours = Number(match[2])
  const minutes = Number(match[3] || 0)
  if (minutes > 59) {
    return null
  }
  // (avoid a negative zero)
  return (hours + (minutes / 60)) * (match[1] === '-' ? -1 : 1) || 0
}
