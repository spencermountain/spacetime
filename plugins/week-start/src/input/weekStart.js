import c from '../data/countries.js'
const firstDay = c.firstDay();
const loc = c.locations();

import iana from '../../zonefile/iana.js'
import spacetime from 'spacetime'
// const fs = require('fs');


function getCountry(country) {
  for (let day in firstDay) {
    if (firstDay.hasOwnProperty(day)) {
      for (let key in firstDay[day]) {
        if (firstDay[day].hasOwnProperty(key)) {
          if ((key === country) || (firstDay[day][key].indexOf(country) !== -1)) {
            return { day: day, country: firstDay[day][key] }
          }
        }
      }
    }
  }
  for (let item in loc) {
    if (loc.hasOwnProperty(item) && loc[item].indexOf(country) !== -1) {
      return { day: 'monday', location: country }
    }
  }
  return {}
}

function getCurrent(tz) {
  if (!tz) {
    return { message: `there are problems determine time zone` }
  }
  // searches if current tz matches with iana
  // gets country key
  for (let key in iana) {
    if (key === tz) {
      if (!iana[key].ctry && !iana[key].loc) {
        let country = getCountry(key.substr(0, key.indexOf('/')))
        if (country) { return country }
        country = getCountry((key.substr(key.indexOf('/') + 1)).replace('_', ' '))
        if (country) { return country }
      }
      else if (iana[key].loc) {
        return getCountry(iana[key].loc)
      }
      else if (iana[key].ctry) {
        return getCountry(iana[key].ctry)
      }
    }
  }
  return null
}

function setWeekStart(value, newDay) {

  const a = {
    country: '',
    origin: '',
    assigned: '',
    key: '',
    isDay: false,
    isCountry: false
  }

  if (!value || !newDay) { return { message: 'missing argument' } }

  // check if values are valid
  for (let day in firstDay) {
    if (firstDay.hasOwnProperty(day)) {
      if (day === newDay.toLowerCase()) { a.isDay = true }
      for (let key in firstDay[day]) {
        if (firstDay[day][key].indexOf(value.toLowerCase()) !== -1) {
          a.origin = day;
          a.assigned = newDay;
          a.country = firstDay[day][key];
          a.key = key;
          a.isCountry = true
        }
      }
    }
  }

  if (!a.isDay || !a.isCountry) {
    return { message: 'incorrect day or country name' }
  }

  // when both entries are valid save new JSON
  delete firstDay[a.origin][a.key];
  firstDay[newDay][a.key] = a.country;
  // const data = JSON.stringify(firstDay);
  // fs.writeFile('../data/countries.json', data);

  return {
    country: a.country,
    origin: a.origin,
    assigned: a.assigned
  };
}

function getWeekStart(country = '') {
  // checks function argument and sets default value
  let tz
  if (!country || typeof country !== 'string') {
    country = null
    tz = spacetime.now().tz
  }
  if (!country) {
    return getCurrent(tz);
  } else if (country) {
    let first = getCountry((country.toLowerCase()).trim())
    if (first) { return first }
    else { return getWeekStart() }
  }
  return null
}

export {
  getWeekStart,
  setWeekStart
}