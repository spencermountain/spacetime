const informal = require('../../zonefile/informal').informal

//these timezone abbreviations are used aggressively in other places
//if tz doesn't have an abbreviation, and is in the same offset...
const greedy_north = {
  '-8': 'america/anchorage',
  '-7': 'america/los_angeles',
  '-6': 'america/denver',
  '-5': 'america/chicago',
  '-4': 'america/new_york',
  '-3': 'america/halifax',

  '0': 'etc/gmt',
  '1': 'europe/lisbon',
  // 0  europe/london
  '2': 'europe/berlin',
// '3': 'europe/riga',
// '3': 'europe/moscow',
}
const greedy_south = {
  '-3': 'america/sao_paulo',
  '0': 'etc/gmt',
  '1': 'africa/lagos',
  '2': 'africa/khartoum',
  '3': 'africa/nairobi',
}

const chooseAbbrev = function(arr, obj) {
  if (arr[1] && obj.current.isDST === true) {
    return arr[1].toUpperCase()
  }
  if (arr[0]) {
    return arr[0].toUpperCase()
  }
  return null
}
//
const display = function(tz, obj) {
  //try a straight-up match
  if (informal.hasOwnProperty(tz)) {
    let abbr = chooseAbbrev(informal[tz], obj)
    if (abbr !== null) {
      return abbr
    }
  }
  let offset = String(obj.default_offset)
  if (obj.hemisphere === 'North' && greedy_north.hasOwnProperty(offset)) {
    let useTz = greedy_north[offset]
    return chooseAbbrev(informal[useTz], obj) || ''
  }
  if (obj.hemisphere === 'South' && greedy_south.hasOwnProperty(offset)) {
    let useTz = greedy_south[offset]
    return chooseAbbrev(informal[useTz], obj) || ''
  }
  return ''
}
module.exports = display
