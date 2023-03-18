//find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src

//this Intl object is not supported often, yet
const safeIntl = () => {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return null
  }
  let format = Intl.DateTimeFormat()
  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return null
  }
  let timezone = format.resolvedOptions().timeZone
  if (!timezone) {
    return null
  }
  return timezone
}

//do it once per computer
const tzOfComputer = safeIntl()

const fallbackTz = function (world) {
  // deduce computer timezone?
  if (world.config.tryLocalTimezone) {

    // use our Intl version, if found
    if (tzOfComputer && tzOfComputer !== 'Etc/Unknown') {
      return tzOfComputer
    }
    // try the sloppier version
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