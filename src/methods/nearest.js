/* eslint-disable no-console */
import { normalize } from '../fns.js'

//round to either current, or +1 of this unit
const nearest = (s, unit) => {
  //how far have we gone?
  let prog = s.progress()
  unit = normalize(unit)
  //fix camel-case for this one
  if (unit === 'quarterhour') {
    unit = 'quarterHour'
  }
  if (prog[unit] !== undefined) {
    // go forward one?
    if (prog[unit] > 0.5) {
      s = s.add(1, unit)
    }
    // go to start
    s = s.startOf(unit)
  } else if (s.silent === false) {
    console.warn("no known unit '" + unit + "'")
  }
  return s
}
export default nearest
