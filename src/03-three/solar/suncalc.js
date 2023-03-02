/* eslint-disable no-mixed-operators, max-params */
/*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/
// shortcuts for easier to read formulas
const PI = Math.PI
const sin = Math.sin
const cos = Math.cos
const tan = Math.tan
const asin = Math.asin
const atan = Math.atan2
const acos = Math.acos
const rad = PI / 180
// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas

// date/time constants and conversions
const dayMs = 1000 * 60 * 60 * 24
const J1970 = 2440588
const J2000 = 2451545;
const toJulian = (date) => date.valueOf() / dayMs - 0.5 + J1970;
const fromJulian = (j) => (j + 0.5 - J1970) * dayMs;
const toDays = (date) => toJulian(date) - J2000;

// general calculations for position
const e = rad * 23.4397; // obliquity of the Earth
const rightAscension = (l, b) => atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
const declination = (l, b) => asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
const azimuth = (H, phi, dec) => atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
const altitude = (H, phi, dec) => asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
const siderealTime = (d, lw) => rad * (280.16 + 360.9856235 * d) - lw;
const solarMeanAnomaly = (d) => rad * (357.5291 + 0.98560028 * d);

// general sun calculations
const J0 = 0.0009;
const julianCycle = (d, lw) => Math.round(d - J0 - lw / (2 * PI));
const approxTransit = (Ht, lw, n) => J0 + (Ht + lw) / (2 * PI) + n;
const solarTransitJ = (ds, M, L) => J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L);
const hourAngle = (h, phi, d) => acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d)));

function eclipticLongitude(M) {
  const C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)) // equation of center
  const P = rad * 102.9372; // perihelion of the Earth
  return M + C + P + PI;
}

function sunCoords(d) {
  const M = solarMeanAnomaly(d)
  const L = eclipticLongitude(M);
  return {
    dec: declination(L, 0),
    ra: rightAscension(L, 0)
  };
}

// calculates sun position for a given date and latitude/longitude
const getPosition = function (date, lat, lng) {
  const lw = rad * -lng
  const phi = rad * lat
  const d = toDays(date)
  const c = sunCoords(d)
  const H = siderealTime(d, lw) - c.ra;
  return {
    azimuth: azimuth(H, phi, c.dec),
    altitude: altitude(H, phi, c.dec)
  };
};

// sun times configuration (angle, morning name, evening name)
const times = [
  [-0.833, 'sunrise', 'sunset'],
  [-0.3, 'sunriseEnd', 'sunsetStart'],
  [-6, 'dawn', 'dusk'],
  [-12, 'nauticalDawn', 'nauticalDusk'],
  [-18, 'nightEnd', 'night'],
  [6, 'goldenHourEnd', 'goldenHour']
];

// returns set time for the given sun altitude
function getSetJ(h, lw, phi, dec, n, M, L) {
  let w = hourAngle(h, phi, dec)
  const a = approxTransit(w, lw, n);
  return solarTransitJ(a, M, L);
}

// calculates sun times for a given date, latitude/longitude, and, optionally,
// the observer height (in meters) relative to the horizon
const getTimes = function (date, lat, lng) {
  const lw = rad * -lng
  const phi = rad * lat
  const d = toDays(date)
  const n = julianCycle(d, lw)
  const ds = approxTransit(0, lw, n)
  const M = solarMeanAnomaly(ds)
  const L = eclipticLongitude(M)
  const dec = declination(L, 0)
  const Jnoon = solarTransitJ(ds, M, L)

  let result = {
    solarNoon: fromJulian(Jnoon),
    nadir: fromJulian(Jnoon - 0.5)
  };
  for (let i = 0; i < times.length; i += 1) {
    let time = times[i];
    let h0 = (time[0]) * rad;
    let Jset = getSetJ(h0, lw, phi, dec, n, M, L);
    let Jrise = Jnoon - (Jset - Jnoon);
    result[time[1]] = fromJulian(Jrise);
    result[time[2]] = fromJulian(Jset);
  }
  return result;
};



export { getPosition, getTimes }
// let lat = 43.65
// let lng = -79.43
// console.log(getTimes(new Date(), lat, lng))