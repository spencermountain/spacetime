// const isNum = /^(etc\/gmt|etc|gmt|utc|h)([+\-0-9 ]+)$/i
// const isOffset = /(\-?[0-9]+)h(rs)?/

//try to match these against iana form
const normalize = function(tz) {
  tz = tz.toLowerCase()
  tz = tz.replace(/ (standard )?time/g, '')
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
    if (typeof zones[tz] === 'string') {
      return zones[tz]
    }
    return tz
  }
  //try to parse 'gmt+5'
  // let m = tz.match(isNum)
  // if (m !== null) {
  //   let num = Number(m[2])
  //   return {
  //     offset: num,
  //     h: 'n'
  //   }
  // }
  // //try to parse '-5h'
  // m = tz.match(isOffset)
  // if (m !== null) {
  //   let num = Number(m[1])
  //   return {
  //     offset: num,
  //     h: 'n'
  //   }
  // }
  return null
}
module.exports = lookupTz
