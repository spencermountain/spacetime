import { isNum } from './_lib.js'

const parseDate = (str = '') => {
  if (isNum(str)) {
    return str
  }
  str = str.trim()
  // remove padding
  str = str.replace(/^0+/, '')

  //remove ordinal suffix
  str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1')

  let date = parseInt(str, 10)

  // return date || 1 // coerce zero to one
  return date
}

export default parseDate