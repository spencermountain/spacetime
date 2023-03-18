import { isNum } from './_lib.js'

const parseYear = (str = '') => {
  if (isNum(str)) {
    return str
  }
  str = str.trim()
  // parse '86 shorthand
  if (/^'[0-9][0-9]$/.test(str) === true) {
    let num = Number(str.replace(/'/, ''))
    if (num > 50) {
      return 1900 + num
    }
    return 2000 + num
  }
  let year = parseInt(str, 10)
  // use a given year from options.today
  // if (!year && today) {
  //   year = today.year
  // }
  // fallback to this year
  year = year || new Date().getFullYear()//remove me
  return year
}

export default parseYear