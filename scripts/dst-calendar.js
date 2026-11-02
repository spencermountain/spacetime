/* eslint-disable no-console */
// pretty-print the next 10 dst changes around the world, using our zonefile rules
import spacetime from '../src/index.ts'
import aliases from '../zonefile/aliases.js'
import { tzdbVersion } from '../zonefile/iana.js'

const MSEC_IN_HOUR = 60 * 60 * 1000

// a local rule like '03/08:02' → utc epoch, given the pre-change offset
const toUtc = (rule, offset, year) => {
  const [month, rest] = rule.split('/')
  const [day, hour, minute = '0'] = rest.split(':')
  return Date.UTC(year, Number(month) - 1, Number(day), Number(hour), Number(minute)) - offset * MSEC_IN_HOUR
}

const shiftLabel = (shift) => {
  const dir = shift > 0 ? 'ahead' : 'back'
  const abs = Math.abs(shift)
  const amount = abs % 1 === 0 ? `${abs}hr` : `${Math.round(abs * 60)}min`
  return `clocks ${dir} ${amount}`
}

const now = Date.now()
const thisYear = new Date(now).getUTCFullYear()
const zones = spacetime.timezones()
const names = Object.keys(zones).filter(tz => zones[tz].dst && aliases.hasOwnProperty(tz) === false)

// every upcoming change, in utc
const events = []
for (let i = 0; i < names.length; i += 1) {
  const tz = names[i]
  const [start, back] = zones[tz].dst.split('->')
  // january + july offsets, according to the library
  const jan = spacetime([thisYear, 0, 10], tz).timezone().current.offset
  const jul = spacetime([thisYear, 6, 10], tz).timezone().current.offset
  // 'start' begins the july-offset period, 'back' ends it
  // (future years re-use this year's rule dates, like the library does)
  for (let year = thisYear; year <= thisYear + 1; year += 1) {
    events.push({ tz, epoch: toUtc(start, jan, year), shift: jul - jan })
    events.push({ tz, epoch: toUtc(back, jul, year), shift: jan - jul })
  }
}
const upcoming = events.filter(e => e.epoch > now).sort((a, b) => a.epoch - b.epoch)

// group same-day changes in the same direction
const groups = []
const byKey = {}
for (let i = 0; i < upcoming.length; i += 1) {
  const e = upcoming[i]
  const date = spacetime(e.epoch, e.tz).format('{day-short} {month-short} {date-ordinal} {year}')
  const key = `${date}|${e.shift}`
  if (byKey[key] === undefined) {
    byKey[key] = { date, shift: e.shift, zones: [] }
    groups.push(byKey[key])
  }
  byKey[key].zones.push(e.tz)
}

const today = spacetime(now).format('{day-short} {month-short} {date-ordinal} {year}')
console.log(`\nNext 10 DST changes · after ${today} · tzdata ${tzdbVersion}\n`)
const top = groups.slice(0, 10)
for (let i = 0; i < top.length; i += 1) {
  const g = top[i]
  let who = g.zones.slice(0, 2).join(', ')
  if (g.zones.length > 2) {
    who += `  …+${g.zones.length - 2} more`
  }
  console.log(`${String(i + 1).padStart(3)}. ${g.date.padEnd(18)} ${shiftLabel(g.shift).padEnd(18)} ${who}`)
}
console.log('')
