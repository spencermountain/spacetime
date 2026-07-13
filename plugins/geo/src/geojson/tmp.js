import fs from 'fs'
let data = fs.readFileSync('./src/geojson/data.json', 'utf8')
data = JSON.parse(data)
let geojson = {
  type: 'FeatureCollection',
  features: []
}
Object.keys(data).forEach(tz => {
  geojson.features.push(data[tz])
})
fs.writeFileSync('./combined.json', JSON.stringify(geojson, null, 2))
export default geojson