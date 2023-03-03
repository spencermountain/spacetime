import { getPosition, getTimes } from './suncalc.js'
import points from './geo-points.js'


const getPoint = function (tz) {
  if (!points.hasOwnProperty(tz)) {
    console.error(`Cannot find tz: '${tz}'`)
    return null
  }
  let [lat, lng] = points[tz]
  return { lat, lng }
}

export default {
  sunrise: function () {
    let { lat, lng } = getPoint(this.tz)
    let r = getTimes(this.epoch, lat, lng)
    return this._from(r.sunrise)
  },
  solarNoon: function () {
    let { lat, lng } = getPoint(this.tz)
    let r = getTimes(this.epoch, lat, lng)
    return this._from(r.solarNoon)
  },
  sunset: function () {
    let { lat, lng } = getPoint(this.tz)
    let r = getTimes(this.epoch, lat, lng)
    return this._from(r.sunset)
  },
  dayLength: function () {
    let start = this.sunrise()
    let end = this.sunset()
    return start.diff(end)
  },
  sunPosition: function () {
    let { lat, lng } = getPoint(this.tz)
    return getPosition(this.epoch, lat, lng)
  },

}