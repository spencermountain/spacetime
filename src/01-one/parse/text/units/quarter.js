const parseQuarter = function (str) {
  str = str.trim()
  str = str.replace(/^q/, '')
  return parseInt(str, 10) || null
}
export default parseQuarter