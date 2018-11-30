//these are common-enough abbreviations
const named = [
  //british
  ['gmt', 'bst'],
  ['gmt', 'ist'],
  //european
  ['wet', 'west'],
  ['cet', 'cest'],
  ['eet', 'eest'],
  ['msk', 'msd'],
  //americas
  ['ast', 'adt'],
  ['est', 'edt'],
  ['cst', 'cdt'],
  ['mst', 'mdt'],
  ['pst', 'pdt'],
  ['akst', 'akdt'],
  //australia
  ['aest', 'aedt'],
  ['acst', 'acdt'],
  ['awst', 'awdt'],
]


//
const displayName = function(found, timezones) {
  for (let i = 0; i < named.length; i += 1) {
    let name = named[i][0]
    let hay = timezones[name]
    // console.log(hay)
    if (hay.offset === found.offset && hay.hem === found.hem) { //&& hay.dst === found.dst
      return name.toUpperCase()
    }
  }
  return ''
}
module.exports = displayName
