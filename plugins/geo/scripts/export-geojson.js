import fs from 'node:fs'
let data = fs.readFileSync(new URL('../src/geojson/data.json', import.meta.url), 'utf8')
data = JSON.parse(data)
const geojson = {
  type: 'FeatureCollection',
  features: []
}
Object.keys(data).forEach(tz => {
  geojson.features.push(data[tz])
})
fs.writeFileSync('./combined.json', JSON.stringify(geojson, null, 2))
export default geojson
