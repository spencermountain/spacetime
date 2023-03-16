import ymd from './01-ymd.js'
import mdy from './02-mdy.js'
import dmy from './03-dmy.js'
import misc from './04-misc.js'

const formats = [].concat(ymd, mdy, dmy, misc)

const parseText = function (txt, tz) {
  // normalize it a bit first
  txt = txt.toLowerCase()
  txt = txt.replace(/([0-9])(th|rd|st|nd)\b/, '$1')
  txt = txt.replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i, '')
  txt = txt.replace(/,/g, '')
  txt = txt.replace(/ +/g, ' ').trim()
  txt = txt.trim()
  for (let i = 0; i < formats.length; i += 1) {
    let m = txt.match(formats[i].reg)
    if (m !== null) {
      // console.log(`reg #${i} - ${formats[i].reg}`)
      let res = formats[i].parse(m)
      if (res) {
        return res
      }
    }
  }
  return null
}
export default parseText