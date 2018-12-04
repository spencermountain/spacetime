const informal = require('../../zonefile/informal').informal
//these timezone abbreviations are used aggressively in other places
//if tz doesn't have an abbreviation, and is in the same offset...
//these are pretty subjective. i just made them up.
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
  '8': 'asia/shanghai'
}
const greedy_south = {
  '-3': 'america/sao_paulo',
  '0': 'etc/gmt',
  '1': 'africa/lagos',
  // '2': 'africa/khartoum',//central africa
  '2': 'africa/johannesburg', //south africa
  '3': 'africa/nairobi',
  '10': 'australia/brisbane',
  '12': 'pacific/auckland'
}

const british = {
  'europe/belfast': true,
  'europe/dublin': true,
  'europe/guernsey': true,
  'europe/jersey': true,
}

const handleSpecial = function(tz, offset) {
  if (british.hasOwnProperty(tz)) {
    if (offset === '1') {
      return 'BST'
    }
    return 'GMT'
  }
  return null
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
  let special = handleSpecial(tz, offset)
  if (special) {
    return special
  }

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
