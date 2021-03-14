var tzlookup = require('tz-lookup')

//.trim() pollyfill
if (!String.prototype.trim) {
  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
  String.prototype.trim = function() {
    return this.replace(rtrim, '')
  }
}
var isArray = function(hmm) {
  return Object.prototype.toString.call(hmm) === '[object Array]'
}
var isString = function(hmm) {
  return typeof hmm === 'string'
}
function isObject(hmm) {
  return hmm instanceof Object && hmm.constructor === Object
}

const findTz = function(geo, b) {
  let lat = null
  let lng = null
  //accept weird formats
  if (typeof b === 'number' && typeof geo === 'number') {
    lat = geo
    lng = b
  } else if (isArray(geo) === true) {
    lat = geo[0]
    lng = geo[1]
  } else if (isString(geo) === true) {
    let arr = geo.split(/[,/]/)
    lat = arr[0].trim()
    lng = arr[1].trim()
  } else if (isObject(geo) === true) {
    lat = geo.lat || geo.latitude
    lng = geo.lng || geo.lon || geo.long || geo.longitude
  } else {
    return this
  }
  //validate lat/lng
  if (lat < -90 || lat > 90) {
    console.warn('Invalid latitude: ' + lat)
    return this
  }
  if (lng < -180 || lng > 180) {
    console.warn('Invalid longitude: ' + lng)
    return this
  }
  let tz = tzlookup(lat, lng)
  if (!tz) {
    console.warn('Found no timezone for ' + lat + ', ' + lng)
    return this
  }
  return this.goto(tz)
}
module.exports = findTz
