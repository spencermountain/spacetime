import fs from 'node:fs'
import unpack from '../src/geojson/_lib.js'
let data = fs.readFileSync(new URL('../src/geojson/packed.json', import.meta.url), 'utf8')
data = JSON.parse(data)
const geojson = {
  type: 'FeatureCollection',
  features: []
}
Object.keys(data).forEach(tz => {
  geojson.features.push(unpack(data[tz]))
})
fs.writeFileSync('./combined.json', JSON.stringify(geojson, null, 2))
export default geojson
