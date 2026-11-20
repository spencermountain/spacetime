import type { TimezoneSet } from '../../types/index.ts'

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

// the fixed-offset timezone for these hours, if we have one
//remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
//https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem
export const fixedZone = (hours: number, zones: TimezoneSet): string | null => {
  if (hours === 0) {
    return 'etc/gmt'
  }
  const num = hours * -1
  const tz = 'etc/gmt' + (num >= 0 ? '+' + num : num)
  return zones[tz] ? tz : null
}
