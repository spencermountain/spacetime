
// this method is replaced in /two
const parseTz = function (input, world) {
  let zones = world.zones || {}
  if (input && zones.hasOwnProperty(input)) {
    return input
  }
  let mins = new Date().getTimezoneOffset()
  let h = mins / 60
  let name = `Etc/GMT${h * -1}`
  if (zones.hasOwnProperty(name)) {
    return name
  }
  return null
}
export default parseTz