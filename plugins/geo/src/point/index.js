import points from './IANA-points.js'
//
const point = function () {
  let tz = this.timezone().name
  if (points.hasOwnProperty(tz) === false) {
    console.warn('Unable to find location for timezone ' + tz)
    return {}
  }
  let arr = points[tz].split(',')
  return {
    lat: parseFloat(arr[0]),
    lng: parseFloat(arr[1])
  }
}
export default point
