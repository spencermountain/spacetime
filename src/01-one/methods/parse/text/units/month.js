// import world from '../../../../world.js'
import { isNum } from './_lib.js'

let mapping = {}
// world.i18n.months.longForm.forEach((str, i) => {
//   mapping[str.toLowerCase()] = i + 1
//   let shrt = world.i18n.months.shortForm[i] || ''
//   mapping[shrt.toLowerCase()] = i + 1
// })
mapping.sept = 9//extra

const parseMonth = function (input) {
  if (isNum(input)) {
    return input
  }
  input = input.toLowerCase().trim()
  return mapping[input]
}
export default parseMonth