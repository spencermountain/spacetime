import { normalize } from '../fns.ts'
import type { Spacetime } from '../types/index.ts'
const units = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute']

const doUnit = function (s: Spacetime, k: string): number {
  const start = s.clone().startOf(k)
  const end = s.clone().endOf(k)
  const duration = end.epoch - start.epoch
  const percent = (s.epoch - start.epoch) / duration
  return parseFloat(percent.toFixed(2))
}

//how far it is along, from 0-1
const progress = (s: Spacetime, unit?: string) => {
  if (unit) {
    unit = normalize(unit)
    return doUnit(s, unit)
  }
  const obj = {}
  units.forEach(k => {
    obj[k] = doUnit(s, k)
  })
  return obj
}

export default progress
