const fs = require('fs')
const path = require('path')
const sh = require('shelljs')
let year = 2021
// let tz = 'australia/melbourne'

const tzs = require('/Users/spencer/mountain/spacetime/zonefile/iana.js')
let list = Object.keys(tzs)

const titleCase = (str) => {
  str = str[0].toUpperCase() + str.substr(1)
  str = str.replace(/\/gmt/, '/GMT')
  str = str.replace(/[\/_]([a-z])/gi, (s) => {
    return s.toUpperCase()
  })
  return str
}

// console.log(list)
// list.forEach((tz) => {
//   tz = titleCase(tz)
//   console.log(tz)
//   let lines = sh.exec(`zdump -v ${tz} | grep ${year}`).toString().split('\n')
//   console.log(lines)
// })

// const zones = require('/Users/spencer/Desktop/zones.json')
// console.log(Object.keys(zones.zoneData))
// console.log(Object.keys(zones.zoneData.Canada))
// console.log(Object.keys(zones.zoneData.EST))
// console.log(zones.zoneData.Canada.Pacific)

const parse = require('parse-zoneinfo')

list.slice(9, 10).forEach((tz) => {
  parse(tz, function (err, tzdata) {
    if (err) {
      console.log(tz)
      // console.log(err)
    } else {
      console.log(tzdata)
    }
  })
})
