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
let tzOfComputer = safeIntl()

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
  return tzOfComputer || world.config.fallbackTz
}
export default findTz