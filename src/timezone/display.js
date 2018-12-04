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

//
const display = function(tz, obj, zones) {
  //try a straight-up match
  if (informal.hasOwnProperty(tz)) {
    let arr = informal[tz]
    if (obj.current.isDST === true) {
      return arr[1].toUpperCase()
    }
    if (arr[0]) {
      return arr[0].toUpperCase()
    }
  }
  let offset = String(obj.current.offset)
  if (greedy.hasOwnProperty(offset)) {
    let useTz = greedy[offset]
  // console.log(useTz)
  }
  return ''
}
module.exports = display
