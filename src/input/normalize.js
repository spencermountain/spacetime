//little cleanup..
const normalize = function (str) {
  str = str.replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i, '')
  str = str.replace(/,/g, '')
  str = str.replace(/ +/g, ' ').trim()
  return str
}

module.exports = normalize
