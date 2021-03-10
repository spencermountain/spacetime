const data = require('/Users/spencer/Downloads/data.json')

// let key = 'DisplayNames' // 140 metazones
// let key = 'TzdbZoneCountries' // which country iana is in (424 of them)
// let key = 'CldrZoneCountries'
// let key = 'CldrMetazones' // *
// let key = 'CldrPrimaryZones'
let key = 'CldrAliases'
// let key = 'CldrLanguageData'
// let key = 'SelectionZones'
console.log(Object.keys(data))
console.log(data[key])
console.log(Object.keys(data[key]).length)

// displaynames[en] = 140
// "'North Asia East Standard Time'"
// console.log(Object.keys(data[key]['en_US']).length)
