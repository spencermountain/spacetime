import model from '../../../../model.js'
import { isNum } from './_lib.js'

let mapping = {}
model.months.forEach((_, i) => {
  if (model.months[i]) {
    mapping[model.months[i].shortForm.toLowerCase()] = i
    mapping[model.months[i].longForm.toLowerCase()] = i
  }
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