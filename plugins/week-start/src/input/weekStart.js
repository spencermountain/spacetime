const firstDay = require('../data/countries').firstDay();
const loc = require('../data/countries').locations();
const iana = require('../../zonefile/iana');
const fs = require('fs');

const spacetime = require('spacetime')

function getCountry(country) {
  for (let day in firstDay) {
    for (let key in firstDay[day]) {
      if ((key === country) || (firstDay[day][key].
        indexOf(country) !== -1)) {
          return { day: day, country: firstDay[day][key] }
      }
    }
  }
  for (let item in loc) {
    if (loc[item].
        indexOf(country) !== -1) {
      return { day: 'monday', location: country }
    } 
  }
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
        let country = getCountry(
            key.substr(0, key.indexOf('/')) )
          if (country) { return country }
        country = getCountry(
            (key.substr(key.indexOf('/')+1)).
            replace('_',' ') )
          if (country) { return country }
      }
      else if (iana[key].loc) {
        return getCountry(country)
      }
      else if (iana[key].ctry) {
        return getCountry(iana[key].ctry)
      }
    }
  }
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
      let firstDay = getCountry((country.toLowerCase()).trim())
        if (firstDay) { return firstDay }
          else { return getWeekStart() }
  }
}

module.exports = { 
  getWeekStart,
  setWeekStart
}