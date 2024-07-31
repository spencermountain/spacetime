/* eslint-disable no-console */

import tzs from '../../zonefile/unpack.js'
import guessTz from './guessTz.js'
import parseOffset from './parseOffset.js'

let local = guessTz()

//add all the city names by themselves
const cities = Object.keys(tzs).reduce((h, k) => {
  let city = k.split('/')[1] || ''
  city = city.replace(/_/g, ' ')
  h[city] = k
  return h
}, {})

//try to match these against iana form
const normalize = (tz) => {
  tz = tz.replace(/ time/g, '')
  tz = tz.replace(/ (standard|daylight|summer)/g, '')
  tz = tz.replace(/\b(east|west|north|south)ern/g, '$1')
  tz = tz.replace(/\b(africa|america|australia)n/g, '$1')
  tz = tz.replace(/\beuropean/g, 'europe')
  tz = tz.replace(/islands/g, 'island')
  return tz
}

// try our best to reconcile the timzone to this given string
const lookupTz = (str, zones) => {
  if (!str) {
    // guard if Intl response is unsupported (#397)
    if (!zones.hasOwnProperty(local)) {
      console.warn(`Unrecognized IANA id '${local}'. Setting fallback tz to UTC.`)
      local = 'utc'
    }
    return local
  }
  if (typeof str !== 'string') {
    console.error("Timezone must be a string - recieved: '", str, "'\n")
  }
  let tz = str.trim()
  // let split = str.split('/')
  //support long timezones like 'America/Argentina/Rio_Gallegos'
  // if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
  //   tz = split[0] + '/' + split[1]
  // }
  tz = tz.toLowerCase()
  if (zones.hasOwnProperty(tz) === true) {
    return tz
  }
  //lookup more loosely..
  tz = normalize(tz)
  if (zones.hasOwnProperty(tz) === true) {
    return tz
  }
  //try city-names
  if (cities.hasOwnProperty(tz) === true) {
    return cities[tz]
  }
  // //try to parse '-5h'
  if (/[0-9]/.test(tz) === true) {
    let id = parseOffset(tz)
    if (id) {
      return id
    }
  }

  throw new Error(
    "Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id."
  )
}
export default lookupTz
