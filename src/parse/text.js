import formats from './formats/index.js'

const parseText = function (txt, tz) {
  let cal = {}
  for (let i = 0; i < formats.length; i += 1) {
    let m = txt.match(formats[i].reg)
    if (m !== null) {
      // console.log(`reg #${i} - ${formats[i].reg}`)
      let out = formats[i].parse(m)
      console.log(out)
      return out
    }
  }
  return cal
}
export default parseText