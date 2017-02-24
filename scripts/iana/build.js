'use strict';
const iana = require('./iana');
const whitelist = require('./whitelist');
const fs = require('./fs');
require('shelljs/global');
config.silent = true;
//this script mines /usr/share/zoneinfo files for the dates that dst changes for each tz
//i'm assuming theres no copyright on these dudes

const parseLine = function(str) {
  let meta = {};
  str = str.replace(/^[a-z\/_]*? /i, '');
  if (str.match(/isdst=0/)) {
    meta.on = false;
  } else {
    meta.on = true;
  }
  let date = str.match(/^(.*) UT = /);
  if (date) {
    date = date[1];
    let d = new Date(date);
    meta.date = `${d.getMonth()}/${d.getDate()}`;
    let month = d.getMonth();
    if (month > 9) {
      meta.season = 'fall';
    } else {
      meta.season = 'spring';
    }
  }

  return meta;
};

const fetchZone = function(tz, year) {
  let zone = {
    tz: tz,
    offset: iana[tz],
    spring: undefined,
    fall: undefined
  };
  let lines = exec(`zdump -v /usr/share/zoneinfo/${tz} | grep ${year}`).toString().split('\n');
  lines.filter(str => str).forEach((str) => {
    let o = parseLine(str);
    zone[o.season] = o.date;
    console.log(zone);
  });
  return zone;
};

const year = 2017;
const all = whitelist.reduce((h, tz) => {
  let o = fetchZone(tz, year);
  h[o.tz] = {
    offset: o.offset,
    spring: o.spring,
    fall: o.fall,
  };
  return h;
}, {});
console.log('==========\n\n\n');
console.log(all);

let content = JSON.stringify(all, null, 2);
let src = path.join(__dirname, `../../${year}_zonefile.js`);
fs.writeFileSync(src, content, 'utf8');

// console.log(parseLine('/usr/share/zoneinfo/Europe/Belgrade  Sun Mar 26 01:00:00 2017 UT = Sun Mar 26 03:00:00 2017 CEST isdst=1 gmtoff=7200'));
// console.log(parseLine('/usr/share/zoneinfo/America/Mexico_City  Sun Apr  2 07:59:59 2017 UT = Sun Apr  2 01:59:59 2017 CST isdst=0 gmtoff=-21600'));
// console.log(fetchZone('Europe/Belgrade', 2017));
// console.log(fetchZone('America/Mexico_City', 2017));
