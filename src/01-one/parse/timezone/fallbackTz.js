
const fallbackTz = function (world) {
  // deduce computer timezone via getTimezoneOffset()?
  if (world.config.tryLocalTimezone) {
    // get (current) timezone offset from js Date
    const mins = new Date().getTimezoneOffset() * -1 //js returns negative
    let h = mins / 60
    // make +ve number negative
    let name = `Etc/GMT${h * -1}`
    if (h < 0) {
      name = `Etc/GMT+${Math.abs(h)}`
    }
    if (world.zones.hasOwnProperty(name)) {
      return name
    }
  }
  return world.config.fallbackTz || null
}
export default fallbackTz