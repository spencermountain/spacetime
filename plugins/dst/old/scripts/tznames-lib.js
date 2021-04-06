const data = require('/Users/spencer/Downloads/data.json')

// let key = 'DisplayNames' // 140 metazones
// let key = 'TzdbZoneCountries' // which country iana is in (424 of them)
// let key = 'CldrZoneCountries'
// let key = 'CldrMetazones' // *
// let key = 'CldrPrimaryZones'
// let key = 'CldrAliases'
let key = 'CldrLanguageData' //i18n place-names
// let key = 'SelectionZones'
// console.log(Object.keys(data))
console.log(Object.keys(data[key]))
// console.log(data[key].en)

// displaynames[en] = 140
// "'North Asia East Standard Time'"
// console.log(data['DisplayNames']['en_US'])

let names = {}
console.log(JSON.stringify(Object.keys(data[key]), null, 2))
Object.keys(data[key]).forEach((lang) => {
  // console.log(data[key][lang].ShortNames)
  names = Object.assign(names, data[key][lang].ShortNames)
})
// console.log(JSON.stringify(names, null, 2))

// 'Africa_Eastern'
// console.log(data['DisplayNames'])
// const byMeta = {}
// Object.keys(data.CldrMetazones).forEach((k) => {
//   let code = data.CldrMetazones[k]
//   byMeta[code] = byMeta[code] || []
//   byMeta[code].push(k)
// })
// console.log(byMeta)
// const byMeta = {}
// Object.keys(data.CldrMetazones).forEach((k) => {
//   let code = data.CldrMetazones[k]
//   byMeta[code] = byMeta[code] || []
//   byMeta[code].push(k)
// })
// console.log(byMeta)

// const byCountry = {}
// Object.keys(data.TzdbZoneCountries).forEach((k) => {
//   let code = data.TzdbZoneCountries[k][0]
//   byCountry[code] = byCountry[code] || []
//   byCountry[code].push(k)
// })
// console.log(byCountry)
