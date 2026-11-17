//little cleanup..
const normalize = function (str: string): string {
  // remove all day-names
  str = str.replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i, '')
  //remove ordinal ending
  str = str.replace(/([0-9])(th|rd|st|nd)/, '$1')
  // ISO 8601 allows a comma before the fraction of a second - '10:30:15,5'
  str = str.replace(/([0-9]{1,2}:[0-9]{2}:[0-9]{2}),([0-9])/g, '$1.$2')
  str = str.replace(/,/g, '')
  str = str.replace(/ +/g, ' ').trim()
  return str
}

export default normalize
