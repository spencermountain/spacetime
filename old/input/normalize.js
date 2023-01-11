//little cleanup..
const normalize = function (str) {
  // remove all day-names
  str = str.replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i, '')
  //remove ordinal ending
  str = str.replace(/([0-9])(th|rd|st|nd)/, '$1')
  str = str.replace(/,/g, '')
  str = str.replace(/ +/g, ' ').trim()
  return str
}

export default normalize
