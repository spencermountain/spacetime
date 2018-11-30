
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
  if (zones.hasOwnProperty(tz) === false && split.length > 2) {
    tz = split[0] + '/' + split[1]
  }
  if (zones.hasOwnProperty(tz) === true) {
    return tz
  }
  //lookup more loosely..
  tz = normalize(tz)
  let keys = Object.keys(zones)
  for (let i = 0; i < keys.length; i += 1) {
    //maybe lowercasing it will do it..
    let name = keys[i].toLowerCase()
    if (name === tz) {
      return keys[i]
    }
    //try the city-name
    let last = name.split('/')[1]
    if (tz === last) {
      return keys[i]
    }
  }
  console.log(tz)
  return null
}
module.exports = lookupTz
