import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const dir = path.dirname(fileURLToPath(import.meta.url)) // eslint-disable-line

// https://timezonedb.com/files/TimeZoneDB.csv.zip
let rows = fs.readFileSync(dir + '/time_zone.csv').toString().split(/\n/g)
let data = {}
let want = new Set([2021, 2022, 2023, 2024])
rows.forEach(str => {
  let [id, _, _co, epoch, offset, on] = str.split(/,/g)
  epoch = Number(epoch) * 1000
  let d = new Date(epoch)
  let year = d.getFullYear()
  if (!want.has(year)) {
    return
  }
  data[id] = data[id] || {}
  data[id][year] = data[id][year] || []
  data[id][year].push(epoch)
})
// delete data['Pacific/Apia']
// delete data['Asia/Tehran']
// delete data['Pacific/Fiji']
// delete data['Africa/Juba'] //no longer dst
// //aliases
// delete data['America/Kentucky/Louisville']
// delete data['America/Indiana/Indianapolis']

export default data
// console.log(data)