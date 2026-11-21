import { formatTimezone } from '../fns.ts'
import type { Zone } from '../types/index.ts'

// a fixed-offset timezone is named by its offset, like '+05:14', and has no data
const reg = /^([+-])([01][0-9]|2[0-3]):([0-5][0-9])$/
const found: Record<string, Zone> = {}

// the name of the fixed-offset timezone that is these hours east of utc
// whole hours from -12 to +14 have an iana name, with its sign reversed: -5 is 'etc/gmt+5'  ¯\_(:/)_/¯
// https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem
const fixedName = (hours: number): string | null => {
  const mins = Math.round(hours * 60)
  if (!(Math.abs(mins) < 1440)) {
    return null
  }
  if (mins === 0) {
    return 'etc/gmt'
  }
  if (mins % 60 === 0 && mins >= -720 && mins <= 840) {
    const num = mins / -60
    return 'etc/gmt' + (num > 0 ? '+' : '') + num
  }
  return formatTimezone(mins / 60, ':')
}

// the timezone data for a '+05:14' name
const fixedZone = (tz: string): Zone | undefined => {
  if (found[tz] === undefined) {
    const m = tz.match(reg)
    if (!m) {
      return undefined
    }
    const mins = (Number(m[2]) * 60) + Number(m[3])
    found[tz] = { offset: (m[1] === '-' ? -mins : mins) / 60, hem: 'n' }
  }
  return found[tz]
}

export { fixedName, fixedZone }
