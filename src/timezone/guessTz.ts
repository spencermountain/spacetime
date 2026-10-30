//find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src
const fallbackTZ = 'utc' //

//this Intl object is not supported often, yet
const safeIntl = () => {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return null
  }
  const format = Intl.DateTimeFormat()
  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return null
  }
  const timezone = format.resolvedOptions().timeZone
  if (!timezone) {
    return null
  }
  return timezone.toLowerCase()
}

const guessTz = () => {
  const timezone = safeIntl()
  if (timezone === null) {
    return fallbackTZ
  }
  return timezone
}
//do it once per computer
export default guessTz
