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
  meta.hem = 's';
  if (meta.on && meta.season === 'spring') {
    meta.hem = 'n';
  }
  if (!meta.on && meta.season === 'fall') {
    meta.hem = 'n';
  }
  return meta;
};

const fetchZone = function(tz, year) {
  let zone = {
    tz: tz,
    min: iana[tz],
  };
  let lines = exec(`zdump -v /usr/share/zoneinfo/${tz} | grep ${year}`).toString().split('\n');
  lines.filter(str => str).forEach((str) => {
    let o = parseLine(str);
    if (o.season) {
      zone[o.season] = o.date;
    }
    zone.hem = o.hem;
  });
  let obj = {
    tz: tz,
    min: iana[tz],
    hem: zone.hem
  };
  if (zone.spring && zone.fall) {
    if (zone.hem === 'n') {
      obj.dst = zone.spring + ' -> ' + zone.fall;
    } else {
      obj.dst = zone.fall + ' -> ' + zone.spring;
    }
  }
  if (!obj.hem) {
    if (obj.tz.match('^(Australia|Antarctica|America/Argentina)/')) {
      obj.hem = 's';
    }
    if (obj.tz.match('^(Canada|Europe|Asia)/')) {
      obj.hem = 'n';
    }
  }
  return obj;
};

const doAll = (year) => {
  const all = whitelist.reduce((h, tz) => {
    let o = fetchZone(tz, year);
    h[o.tz] = {
      min: o.min,
      hem: o.hem
    };
    if (o.dst) {
      h[o.tz].dst = o.dst;
    }
    if (!o.dst) {
      delete o.dst;
    }
    if (!o.hem) {
      delete o.hem;
    }
    console.log(o);
    console.log('\n');
    return h;
  }, {});
  console.log('==========\n\n\n');
  console.log(all);
  let stuff = JSON.stringify(all, null, 2);

  let src = path.join(__dirname, `../../data/zonefile.${year}.json`);
  fs.writeFileSync(src, stuff, 'utf8');
};

doAll(year);
// console.log(parseLine('/usr/share/zoneinfo/Europe/Belgrade  Sun Mar 26 01:00:00 2017 UT = Sun Mar 26 03:00:00 2017 CEST isdst=1 gmtmin=7200'));
// console.log(parseLine('/usr/share/zoneinfo/America/Mexico_City  Sun Apr  2 07:59:59 2017 UT = Sun Apr  2 01:59:59 2017 CST isdst=0 gmtmin=-21600'));
// console.log(fetchZone('Canada/Pacific', 2017));
// console.log(fetchZone('Europe/Belgrade', 2017));
// console.log(fetchZone('Australia/Sydney', 2017));
// console.log(fetchZone('Africa/Windhoek', 2017));
