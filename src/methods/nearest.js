import { normalize } from '../fns.js'

const units = ['year', 'season', 'quarter', 'month', 'week', 'date', 'quarterhour', 'hour', 'minute']

const nearest = (s, unit) => {
  unit = normalize(unit)
  if (!units.includes(unit)) {
    if (s.silent === false) {
      console.warn("no known unit '" + unit + "'") // eslint-disable-line no-console
    }
    return s
  }
  const lower = s.startOf(unit)
  const upper = lower.add(1, unit)
  // Compare exact distances; ties keep the earlier boundary.
  if (s.epoch - lower.epoch > upper.epoch - s.epoch) {
    return upper
  }
  return lower
}

export default nearest
