import { isNum } from './_lib.js'

const parseHour = function (str) {
  if (isNum(str)) {
    return str
  }
  str = str.trim().toLowerCase()
  // leading 0s
  str = str.replace(/^[0:]+/, '')
  // '4h'
  str = str.replace(/([0-9])h$/, '$1')
  // '4'
  let n = parseInt(str, 10)
  if (n) {
    return n
  }
  //'5pm'
  let m = str.match(/([0-9]+) ?(am|pm)$/)
  if (m !== null && m[1]) {
    let h = Number(m[1])
    if (m[2] === 'pm') {
      h += 12
    }
    return h
  }
  return 0
}
export default parseHour