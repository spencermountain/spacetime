import { getPosition, getTimes } from './suncalc.js'

let lat = 43.65
let lng = -79.43

export default {
  sunrise: function () {
    let r = getTimes(new Date(), lat, lng)
    return this._from(r.sunrise)
  },
  solarNoon: function () {
    let r = getTimes(new Date(), lat, lng)
    return this._from(r.solarNoon)
  },
  sunset: function () {
    let r = getTimes(new Date(), lat, lng)
    return this._from(r.sunset)
  },
  dayLength: function () {
    let start = this.sunrise()
    let end = this.sunset()
    return start.diff(end)
  },

}