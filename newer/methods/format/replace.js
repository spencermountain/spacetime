import formats from './formats.js'

const replace = function (cal, str) {
  let sections = /\{(.+?)\}/g
  str = str.replace(sections, (_, name) => {
    name = name.toLowerCase().trim()
    if (formats.hasOwnProperty(name)) {
      return formats[name](cal)
    }
    return `{${name}}`
  })
  return str
}
export default replace