import spacetime from '../../../src/index.js'
import zone from '../src/zonefile.2022.js'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const dir = path.dirname(fileURLToPath(import.meta.url)) // eslint-disable-line

// https://timezonedb.com/files/TimeZoneDB.csv.zip
let rows = fs.readFileSync(dir + '/time_zone.csv').toString().split(/\n/g)
let data = {}
rows.forEach(str => {
  let [id] = str.split(/,/g)
  data[id] = true
})
Object.keys(zone).forEach(k => {
  let s = spacetime.now(k)
  let tz = s.timezone().name
  if (!data.hasOwnProperty(tz)) {
    console.log(tz)
  }
})
