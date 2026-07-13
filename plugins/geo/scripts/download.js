import sh from 'shelljs'
import fs from 'fs'
import { simplify } from '@turf/simplify'
import zonefile from '../../../zonefile/iana.js'

// degrees; ~11km at equator — tune for world-map vs boundary accuracy
const simplifyOptions = {
  tolerance: 0.1,
  highQuality: true,
  mutate: true,
}
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
    combined[tz] = simplify(tzData, simplifyOptions)
  } else {
    console.log(`${filename}.json not found`)
  }
})

const outputFile = './src/geojson/data.json'
fs.writeFileSync(outputFile, JSON.stringify(combined, null, 2))
const { size } = fs.statSync(outputFile)
console.log(`wrote ${outputFile} (${(size / 1024 / 1024).toFixed(2)} MB)`)
sh.exec(`rm -rf ./tz-downloads`)
sh.exec(`rm -rf ./timezone-geojson`)
sh.exec(`rm -rf ./timezone-geojson.zip`)
sh.exec(`rm -rf __MACOSX`)