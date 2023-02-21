const ampm = function (str) {
  str = str.trim().toLowerCase()
  // a.m.
  str = str.replace(/\./g, '')
  if (str === 'am' || str === 'pm') {
    return str
  }
  return null
}
export default ampm