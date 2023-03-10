
const fallbackTz = function (world) {
  // deduce computer timezone via getTimezoneOffset()?
  if (world.config.tryLocalTimezone) {
    const mins = new Date().getTimezoneOffset()// get (current) timezone offset from js Date
    let h = mins / 60
    let name = `Etc/GMT${h * -1}`
    if (world.zones.hasOwnProperty(name)) {
      return name
    }
  }
  return world.config.fallbackTz || null
}
export default fallbackTz