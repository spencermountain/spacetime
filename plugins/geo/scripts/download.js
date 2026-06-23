import sh from 'shelljs'
import spacetime from '../../../src/index.js'
import fs from 'fs'
import zonefile from '../../../zonefile/iana.js'
// let zonefile = spacetime.timezones()
sh.exec(`wget 'https://www.geoapify.com/data-share/timezones/timezone-geojson.zip'`)
sh.exec(`unzip -o timezone-geojson.zip`)
sh.exec(`mkdir ./tz-downloads`)

sh.ls('./timezone-geojson').forEach(file => {
  if (file.endsWith('.geojson')) {
    sh.mv(`./timezone-geojson/${file}`, `./tz-downloads/${file.toLowerCase()}`)
  }
})
let combined = {}
Object.keys(zonefile).forEach(tz => {
  let filename = tz.replace('/', '__')
  let file = `./tz-downloads/${filename}.geojson`
  if (fs.existsSync(file)) {
    const tzFile = fs.readFileSync(file, 'utf8')
    const tzData = JSON.parse(tzFile)
    console.log(filename)
    combined[tz] = tzData
  } else {
    console.log(`${filename}.json not found`)
  }
})

fs.writeFileSync('./combined.json', JSON.stringify(combined, null, 2))
sh.exec(`rm -rf ./tz-downloads`)
sh.exec(`rm -rf __MACOSX`)