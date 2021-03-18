const sunCalc = require('suncalc')
const spacetimeGeo = require('spacetime-geo')
const sunPosition = require('./sunPosition')
const { solstice } = require('./solstices') //equinox

const setFrom = function (s, time) {
  let d = new Date(time)
  // console.log(time)
  s = s.clone()
  s.epoch = d.getTime()
  return s
}

const calculatePoint = function (s, lat, lng, field) {
  if (lat === undefined || lng === undefined) {
    let guess = s.point()
    lat = guess.lat
    lng = guess.lng
  }
  s.in = s.in || spacetimeGeo.in //bolt-on the plugin
  s = s.in(lat, lng)
  let d = new Date(s.epoch)
  let res = sunCalc.getTimes(d, lat, lng)
  return setFrom(s, res[field])
}

module.exports = {
  //depend on this plugin
  in: spacetimeGeo.in,
  point: spacetimeGeo.point,

  solstice: function () {
    return solstice(this)
  },
  winterSolstice: function () {
    return solstice(this).winter
  },
  summerSolstice: function () {
    return solstice(this).summer
  },
  sunPosition: function (lat, lng) {
    return sunPosition(this, lat, lng)
  },
  sunrise: function (lat, lng) {
    return calculatePoint(this, lat, lng, 'sunrise')
  },
  sunset: function (lat, lng) {
    return calculatePoint(this, lat, lng, 'sunset')
  },
  noon: function (lat, lng) {
    return calculatePoint(this, lat, lng, 'solarNoon')
  },
  dawn: function (lat, lng) {
    return calculatePoint(this, lat, lng, 'dawn')
  },
  dusk: function (lat, lng) {
    return calculatePoint(this, lat, lng, 'dusk')
  },
  daylight: function (lat, lng) {
    let sunrise = this.sunrise(lat, lng)
    let sunset = this.sunset(lat, lng)
    let delta = sunset.since(sunrise)
    //clean this up a bit
    let duration = {
      hours: delta.diff.hours,
      minutes: delta.diff.minutes,
      seconds: delta.diff.seconds,
    }
    let diff = sunrise.diff(sunset)
    diff.seconds = parseInt((sunset.epoch - sunrise.epoch) / 1000, 10)

    let now = sunrise.diff(this)
    now.seconds = parseInt((this.epoch - sunrise.epoch) / 1000, 10)

    let progress = now.seconds / diff.seconds
    let status = 'day'
    let dawn = this.dawn()
    let dusk = this.dusk()
    if (progress < 0) {
      progress = 0
      if (this.epoch > dawn.epoch) {
        status = 'dawn'
      } else {
        status = 'night'
      }
    } else if (progress > 1) {
      progress = 0
      if (this.epoch < dusk.epoch) {
        status = 'dusk'
      } else {
        status = 'night'
      }
    }

    return {
      dawn: dawn.time(),
      sunrise: sunrise.time(),
      sunset: sunset.time(),
      dusk: dusk.time(),
      duration: {
        inHours: diff.hours,
        inMinutes: diff.minutes,
        inSeconds: diff.seconds,
        human: duration,
      },
      current: {
        progress: progress,
        status: status,
      },
    }
  },
}
