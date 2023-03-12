import model from '../../../../model.js'
import { isNum } from './_lib.js'

let mapping = {}
model.months.forEach((_, i) => {
  mapping[model.months[i].shortForm.toLowerCase()] = i + 1
  mapping[model.months[i].longForm.toLowerCase()] = i + 1
})
mapping.sept = 9//extra

const parseMonth = function (input) {
  if (isNum(input)) {
    return input
  }
  input = input.toLowerCase().trim()
  return mapping[input]
}
export default parseMonth