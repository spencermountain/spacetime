import { normalize } from '../fns.ts'
import type { Spacetime, TimeUnit } from '../types/index.ts'
const units: TimeUnit[] = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute']

const doUnit = function (s: Spacetime, k: TimeUnit): number {
  const start = s.clone().startOf(k)
  const end = s.clone().endOf(k)
  const duration = end.epoch - start.epoch
  const percent = (s.epoch - start.epoch) / duration
  return parseFloat(percent.toFixed(2))
}

//how far it is along, from 0-1
const progress = (s: Spacetime, unit?: TimeUnit) => {
  if (unit) {
    unit = normalize(unit)
    return doUnit(s, unit)
  }
  const obj: Record<string, number> = {}
  units.forEach(k => {
    obj[k] = doUnit(s, k)
  })
  return obj
}

export default progress
