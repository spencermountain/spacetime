import months from '../../../compute/_lib/months.js'
import { isNum } from './_lib.js'

let mapping = months.reduce((h, o, i) => {
  h[o.long.toLowerCase()] = i + 1
  h[o.short.toLowerCase()] = i + 1
  return h
}, {})
// add this ones
mapping.sept = 9

const parseMonth = function (input) {
  if (isNum(input)) {
    return input
  }
  input = input.toLowerCase().trim()
  return mapping[input]
}
export default parseMonth