import { normalize } from '../fns.ts'
import { bounds } from './startOf.ts'
import type { Spacetime, TimeUnit } from '../types/index.ts'
const units: TimeUnit[] = ['century', 'decade', 'year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute']

// how many years these units span
const yearSpans: Record<string, number> = { decade: 10, century: 100 }

const toPercent = (s: Spacetime, start: Spacetime, end: Spacetime): number => {
  const duration = end.epoch - start.epoch
  const percent = (s.epoch - start.epoch) / duration
  return parseFloat(percent.toFixed(2))
}

const doUnit = function (s: Spacetime, k: TimeUnit): number {
  const [start, end] = bounds(s, k)
  return toPercent(s, start, end)
}

// decades and centuries begin on a jan 1st, so step there from the start of this year
// (quicker than a full startOf + endOf)
const doYears = function (s: Spacetime, size: number, yearStart: Spacetime): number {
  const round = size === 10 ? Math.floor : Math.trunc
  const first = round(yearStart.year() / size) * size
  const start = yearStart.year(first)
  const end = start.year(first + size)
  end.epoch -= 1 // the last millisecond, like endOf
  return toPercent(s, start, end)
}

//how far it is along, from 0-1
const progress = (s: Spacetime, unit?: TimeUnit) => {
  if (unit) {
    unit = normalize(unit)
    if (yearSpans[unit] && s.isValid()) {
      return doYears(s, yearSpans[unit], s.startOf('year'))
    }
    return doUnit(s, unit)
  }
  const obj: Record<string, number> = {}
  const yearStart = s.startOf('year')
  units.forEach(k => {
    obj[k] = yearSpans[k] && s.isValid() ? doYears(s, yearSpans[k], yearStart) : doUnit(s, k)
  })
  return obj
}

export default progress
