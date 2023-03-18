


const findTz = function (str, world) {
  str = str || ''
  if (world.zones.hasOwnProperty(str)) {
    return str
  }
  str = str.toLowerCase().trim()
  // if (aliases.hasOwnProperty(str)) {
  //   return aliases[str]
  // }
  // if (mapping.hasOwnProperty(str)) {
  //   return mapping[str]
  // }
  return null
}
export default findTz