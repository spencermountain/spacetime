import model from '../../../model.js'
import { isNum } from './_lib.js'

let mapping = { tues: 2, thur: 4, thurs: 4 }
model.days.forEach((_, i) => {
  mapping[model.days[i].shortForm.toLowerCase()] = i
  mapping[model.days[i].longForm.toLowerCase()] = i
})


const parseDay = function (str) {
  if (isNum(str)) {
    return str
  }
  str = str.trim().toLowerCase()
  if (mapping.hasOwnProperty(str)) {
    return mapping[str]
  }
  return null
}
export default parseDay