
//try to match these against iana form
const normalize = function(tz) {
  tz = tz.toLowerCase()
  tz = tz.replace(/ /g, '_')
  return tz
}

// try our best to reconcile the timzone to this given string
const lookupTz = function(str, zones) {
  let tz = str.trim()
  let split = str.split('/')
  //support long timezones like 'America/Argentina/Rio_Gallegos'
  if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
    tz = split[0] + '/' + split[1]
  }
  if (zones.hasOwnProperty(tz) === true) {
    return tz
  }
  //lookup more loosely..
  tz = normalize(tz)
  if (zones.hasOwnProperty(tz) === true) {
    return tz
  }
  return null
}
module.exports = lookupTz
