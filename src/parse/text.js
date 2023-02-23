import formats from './formats/index.js'

const parseText = function (txt, tz) {
  let cal = {}
  // normalize it a bit first
  txt = txt.toLowerCase()
  txt = txt.replace(/,/g, '')
  txt = txt.trim()

  for (let i = 0; i < formats.length; i += 1) {
    let m = txt.match(formats[i].reg)
    if (m !== null) {
      // console.log(`reg #${i} - ${formats[i].reg}`)
      let out = formats[i].parse(m)
      return out
    }
  }
  return cal
}
export default parseText