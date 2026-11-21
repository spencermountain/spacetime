import { normalize } from '../fns.ts'
import ceil from './ceil.ts'
import type { Spacetime, TimeUnit } from '../types/index.ts'

const units = ['century', 'decade', 'year', 'season', 'quarter', 'month', 'week', 'date', 'quarterhour', 'hour', 'minute']

const nearest = (s: Spacetime, unit: TimeUnit): Spacetime => {
  unit = normalize(unit)
  if (!units.includes(unit)) {
    if (s.silent === false) {
      console.warn("no known unit '" + unit + "'") // eslint-disable-line no-console
    }
    return s
  }
  // the closer of floor and ceil - both leave a boundary alone, so this does too
  const lower = s.startOf(unit)
  const upper = ceil(s, unit)
  // Compare exact distances; ties keep the earlier boundary.
  if (s.epoch - lower.epoch > upper.epoch - s.epoch) {
    return upper
  }
  return lower
}

export default nearest
