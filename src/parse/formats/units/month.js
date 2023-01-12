import months from '../../../compute/_lib/months.js'

let mapping = months.reduce((h, o, i) => {
  h[o.long.toLowerCase()] = i + 1
  h[o.short.toLowerCase()] = i + 1
  return h
}, {})
// add this ones
mapping.sept = 9

const parseMonth = function (str) {
  str = str.toLowerCase().trim()
  return months[str]
}
export default parseMonth