'use strict';
const zonefile = require('./zonefile.2017.json');

//compress timezone data by continent
const unpack = (obj) => {
  let all = {};
  let keys = Object.keys(obj);
  keys.forEach((cont) => {
    let cities = Object.keys(obj[cont]);
    cities.forEach((city) => {
      let tz = cont + '/' + city;
      all[tz] = obj[cont][city];
      all[tz].tz = tz;
    });
  });
  return all;
};

const data = unpack(zonefile);
module.exports = data;
