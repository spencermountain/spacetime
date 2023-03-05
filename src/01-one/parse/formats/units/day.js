import world from '../../../../world.js'
import { isNum } from './_lib.js'

let mapping = { tues: 2, thur: 4, thurs: 4 }
world.i18n.days.longForm.forEach((str, i) => {
  mapping[str.toLowerCase()] = i
  let shrt = world.i18n.days.shortForm[i] || ''
  mapping[shrt.toLowerCase()] = i
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