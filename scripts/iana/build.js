'use strict';
const iana = require('./iana');
// const whitelist = require('./whitelist');
const whitelist = Object.keys(iana);
const fs = require('fs');
const path = require('path');
require('shelljs/global');
config.silent = true;
//this script mines /usr/share/zoneinfo files for the dates that dst changes for each tz
//i'm assuming theres no copyright on these things

//change this to generate a new one
const year = 2017;

const parseLine = function(str) {
  let meta = {};
  str = str.replace(/^[a-z\/_]*? /i, '');
  if (str.match(/isdst=0/)) {
    meta.on = false;
  } else {
    meta.on = true;
  }
  let date = str.match(/ UT = (.*) 2017/);
  if (date) {
    date = date[1];
    let d = new Date(date);
    if (d.getMinutes() === 59) {
      return {};
    }
    meta.date = `${d.getMonth()}/${d.getDate()}/${d.getHours()}`;
    let month = d.getMonth();
    if (month > 6) {
      meta.season = 'fall';
    } else {
      meta.season = 'spring';
    }
  }
  meta.hemisphere = 'south';
  if (meta.on && meta.season === 'spring') {
    meta.hemisphere = 'north';
  }
  if (!meta.on && meta.season === 'fall') {
    meta.hemisphere = 'north';
  }
  return meta;
};

const fetchZone = function(tz, year) {
  let zone = {
    tz: tz,
    offset: iana[tz],
  };
  let lines = exec(`zdump -v /usr/share/zoneinfo/${tz} | grep ${year}`).toString().split('\n');
  lines.filter(str => str).forEach((str) => {
    let o = parseLine(str);
    if (o.season) {
      zone[o.season] = o.date;
      zone.hemisphere = o.hemisphere;
    }
  });
  let obj = {
    tz: tz,
    offset: iana[tz]
  };
  if (zone.spring && zone.fall) {
    if (zone.hemisphere === 'north') {
      obj.dst = zone.spring + ' -> ' + zone.fall;
    } else {
      obj.dst = zone.fall + ' -> ' + zone.spring;
    }
  }
  return obj;
};

const doAll = (year) => {
  const all = whitelist.reduce((h, tz) => {
    let o = fetchZone(tz, year);
    console.log(o);
    console.log('\n');
    h[o.tz] = {
      offset: o.offset
    };
    if (o.dst) {
      h[o.tz].dst = o.dst;
    }
    return h;
  }, {});
  console.log('==========\n\n\n');
  console.log(all);
  let content = JSON.stringify(all, null, 2);
  let src = path.join(__dirname, `../../zonefile.${year}.js`);
  fs.writeFileSync(src, content, 'utf8');
};

doAll(year);
// console.log(parseLine('/usr/share/zoneinfo/Europe/Belgrade  Sun Mar 26 01:00:00 2017 UT = Sun Mar 26 03:00:00 2017 CEST isdst=1 gmtoff=7200'));
// console.log(parseLine('/usr/share/zoneinfo/America/Mexico_City  Sun Apr  2 07:59:59 2017 UT = Sun Apr  2 01:59:59 2017 CST isdst=0 gmtoff=-21600'));
// console.log(fetchZone('Canada/Pacific', 2017));
// console.log(fetchZone('Europe/Belgrade', 2017));
// console.log(fetchZone('Australia/Sydney', 2017));
// console.log(fetchZone('Africa/Windhoek', 2017));
