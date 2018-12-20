const tzs = require('../../zonefile/unpack')
const informal = require('../../zonefile/informal').lookup
const guessTz = require('./guessTz')
const local = guessTz()
// console.log(informal)
// const isNum = /^(etc\/gmt|etc|gmt|utc|h)([+\-0-9 ]+)$/i
const isOffset = /(\-?[0-9]+)h(rs)?/

//add all the city names by themselves
const cities = Object.keys(tzs).reduce((h, k) => {
  let city = k.split('/')[1]
  city = city.replace(/_/g, ' ')
  h[city] = k
  return h
}, {})

//try to match these against iana form
const normalize = function(tz) {
  tz = tz.replace(/ time/g, '')
  tz = tz.replace(/ (standard|daylight|summer)/g, '')
  tz = tz.replace(/\b(east|west|north|south)ern/g, '$1')
  tz = tz.replace(/\b(africa|america|australia)n/g, '$1')
  tz = tz.replace(/\beuropean/g, 'europe')
  tz = tz.replace(/\islands/g, 'island')
  return tz
}

// try our best to reconcile the timzone to this given string
const lookupTz = function(str, zones) {
  if (!str) {
    return local
  }
  let tz = str.trim()
  let split = str.split('/')
  //support long timezones like 'America/Argentina/Rio_Gallegos'
  if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
    tz = split[0] + '/' + split[1]
  }
  tz = tz.toLowerCase()
  if (zones.hasOwnProperty(tz) === true) {
    return tz
  }
  //lookup more loosely..
  tz = normalize(tz)
  if (zones.hasOwnProperty(tz) === true) {
    return tz
  }
  //try abbrevations and things
  if (informal.hasOwnProperty(tz) === true) {
    return informal[tz]
  }
  //try city-names
  if (cities.hasOwnProperty(tz) === true) {
    return cities[tz]
  }
  // //try to parse '-5h'
  m = tz.match(isOffset)
  if (m !== null) {
    let num = Number(m[1])
    num = num * -1 //it's opposite!
    num = (num > 0 ? '+' : '') + num
    let gmt = 'etc/gmt' + num
    if (zones.hasOwnProperty(gmt)) {
      return gmt
    }
  }
  console.warn('Cannot find timezone named: \'' + str + '\'')
  return local
}
module.exports = lookupTz
