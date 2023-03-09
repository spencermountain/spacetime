// try to get fallback from js Date
const mins = new Date().getTimezoneOffset()
let h = mins / 60

const fallbackTz = function (world) {
  let name = `Etc/GMT${h * -1}`
  if (world.zones.hasOwnProperty(name)) {
    return name
  }
  return world.config.fallbackTz || null
}
export default fallbackTz