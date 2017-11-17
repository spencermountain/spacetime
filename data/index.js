'use strict';
const zonefile = require('./zonefile.2017.json');

//assumed hemisphere, based on continent
const southern = {
  Australia: true,
  Chile: true,
  Brazil: true,
  Antarctica: true
};

//compress timezone data by continent
const unpack = obj => {
  let all = {};
  let keys = Object.keys(obj);
  keys.forEach(cont => {
    let cities = Object.keys(obj[cont]);
    cities.forEach(city => {
      let tz = cont + '/' + city;
      let arr = obj[cont][city];

      all[tz] = {
        o: arr[0],
        h: arr[1],
      }
      if (arr[2]) {
        all[tz].dst = arr[2]
      }
      //assume north, unless it says otherwise (sorry!)
      if (southern[cont] === true) {
        all[tz].h = 's';
      }
    });
  });
  //add this rando
  all['Etc/UTC'] = {
    o: 0,
    h: "n"
  }
  all.UTC = all['Etc/UTC'];
  return all;
};

const data = unpack(zonefile);
// console.log(data);
module.exports = data;
