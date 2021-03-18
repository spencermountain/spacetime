var tzlookup = require("tz-lookup");
const points = require('../../src/IANA-points.js')

Object.keys(points).forEach((k) => {
  let geo = points[k].split(',')
  let tz = tzlookup(geo[0], geo[1])
  if (k !== tz) {
    console.log(`want: ${k},   have: ${tz}`)
  }
})
