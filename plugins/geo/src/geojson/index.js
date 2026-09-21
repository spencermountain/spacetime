import data from './data.json' with { type: 'json' }
//
const geojson = function () {
  const tz = this.timezone().name
  if (data.hasOwnProperty(tz) === false) {
    console.warn('Unable to find geosjon for timezone ' + tz)
    return null
  }
  return data[tz]
}
export default geojson
