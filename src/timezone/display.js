const informal = require('../../zonefile/informal').informal

//these timezone abbreviations are used aggressively in other places
//if tz doesn't have an abbreviation, and is in the same offset...
const greedy = {
  '-8': 'america/anchorage',
  '-7': 'america/los_angeles',
  '-6': 'america/denver',
  '-5': 'america/chicago',
  '-4': 'america/new_york',
  '-3': 'america/halifax',
  // '-3': 'america/sao_paulo',
  '1': 'europe/lisbon',
  // 1  europe/london
  // '1': 'africa/lagos',
  '2': 'europe/berlin',
  // '2': 'africa/khartoum',
  '3': 'europe/moscow',
// '3':  'europe/riga',
// '3': 'africa/nairobi',
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
  if (greedy.hasOwnProperty(offset)) {
    let useTz = greedy[offset]
    let arr = informal[useTz] || []
    return chooseAbbrev(arr, obj) || ''
  }
  return ''
}
module.exports = display
