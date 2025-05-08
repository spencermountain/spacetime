import spacetime from '../../../src/index.js'
import zone from '../src/zonefile.2022.js'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const dir = path.dirname(fileURLToPath(import.meta.url)) // eslint-disable-line

// https://timezonedb.com/files/TimeZoneDB.csv.zip
const rows = fs.readFileSync(dir + '/time_zone.csv').toString().split(/\n/g)
const data = {}
rows.forEach(str => {
  const [id] = str.split(/,/g)
  data[id] = true
})
Object.keys(zone).forEach(k => {
  const s = spacetime.now(k)
  const tz = s.timezone().name
  if (!data.hasOwnProperty(tz)) {
    console.log(tz)
  }
})
