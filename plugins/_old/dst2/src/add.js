import { units, baseUnit } from './units.js'

const processUnit = (unitName, state, changes) => {
  // Base case - no more units to process
  if (!unitName) return state

  const unit = units[unitName]

  // Add any changes for this unit
  if (changes[unitName]) {
    state[unitName] += changes[unitName]
  }

  // Handle overflow if needed
  if (state[unitName] > unit.max(state)) {
    const overflow = Math.floor(state[unitName] - unit.max(state))
    state[unitName] -= overflow

    // Add overflow to next unit if it exists
    if (unit.next) {
      changes[unit.next] = (changes[unit.next] || 0) + overflow
    }
  }

  // Normalize current unit
  state[unitName] = unit.normalize(state[unitName], state)

  // Process next unit
  return processUnit(unit.next, state, changes)
}

export const addUnits = (state, additions) => {
  return processUnit(baseUnit, { ...state }, additions)
} 