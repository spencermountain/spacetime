import fmt from './formats.js'

const replace = function (cal, str) {
  let sections = /\{(.+?)\}/g
  str = str.replace(sections, (_, name) => {
    name = name.toLowerCase().trim()
    if (fmt.hasOwnProperty(name)) {
      return fmt[name](cal)
    }
    return `{${name}}`
  })
  return str
}
export default replace