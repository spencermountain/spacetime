'use strict';
const zonefile = require('./zonefile.2017.json');
const hemispheres = require('./hemisphere');

//assumed hemisphere, based on continent
const southern = { Australia: true, Chile: true, Brazil: true, Antarctica: true };

//compress timezone data by continent
const unpack = obj => {
  let all = {};
  let keys = Object.keys(obj);
  keys.forEach(cont => {
    let cities = Object.keys(obj[cont]);
    cities.forEach(city => {
      let tz = cont + '/' + city;
      all[tz] = obj[cont][city];
      if (typeof all[tz] === 'number') {
        all[tz] = {
          o: all[tz]
        };
      }
      all[tz].tz = tz;
      if (southern[cont] === true || hemispheres.south[tz]) {
        all[tz].h = all[tz].h || 's';
      }
    });
  });
  //alias this one
  all.UTC = all['Etc/UTC'];
  return all;
};

const data = unpack(zonefile);
// console.log(data);
module.exports = data;
