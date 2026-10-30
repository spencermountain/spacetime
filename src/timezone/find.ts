import tzs from '../../zonefile/unpack.ts'
import guessTz from './guessTz.ts'
import parseOffset from './parseOffset.ts'
import type { TimezoneSet } from '../types/index.ts'

let local = guessTz()

//add all the city names by themselves
const cities: Record<string, string> = {}
Object.keys(tzs).forEach((k) => {
  const city = k.split('/').pop().replace(/_/g, ' ')
  cities[city] = k
})

//try to match these against iana form
const normalize = (tz: string): string => {
  tz = tz.replace(/ time/g, '')
  tz = tz.replace(/ (standard|daylight|summer)/g, '')
  tz = tz.replace(/\b(east|west|north|south)ern/g, '$1')
  tz = tz.replace(/\b(africa|america|australia)n/g, '$1')
  tz = tz.replace(/\beuropean/g, 'europe')
  tz = tz.replace(/islands/g, 'island')
  return tz
}

// try our best to reconcile the timzone to this given string
const lookupTz = (str: string | null | undefined, zones: TimezoneSet): string => {
  if (!str) {
    // guard if Intl response is unsupported (#397)
    if (!zones.hasOwnProperty(local)) {
      console.warn(`Unrecognized IANA id '${local}'. Setting fallback tz to UTC.`) // eslint-disable-line no-console
      local = 'utc'
    }
    return local
  }
  if (typeof str !== 'string') {
    console.error("Timezone must be a string - recieved: '", str, "'\n") // eslint-disable-line no-console
  }
  let tz = str.trim()
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
    const id = parseOffset(tz)
    if (id) {
      return id
    }
  }

  throw new Error(
    "Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id."
  )
}
export default lookupTz
