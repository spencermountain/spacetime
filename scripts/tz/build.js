import iana from './iana.js'
import { writeFileSync } from 'fs'
import sh from 'shelljs'
// const whitelist = require('./whitelist');
const whitelist = Object.keys(iana)
sh.config.silent = true
//this script mines /usr/share/zoneinfo files for the dates that dst changes for each tz
//i'm assuming theres no copyright on these things

//change this to generate a new one
const year = 2023//new Date().getFullYear()

const parseLine = (str) => {
  const meta = {}
  str = str.replace(/^[a-z\/_]*? /i, '')
  if (str.match(/isdst=0/)) {
    meta.on = false
  } else {
    meta.on = true
  }
  let date = str.match(/ UT = (.*) 2017/)
  if (date) {
    date = date[1]
    const d = new Date(date)
    if (d.getMinutes() === 59) {
      return {}
    }
    meta.date = `${d.getMonth()}/${d.getDate()}/${d.getHours()}`
    const month = d.getMonth()
    if (month > 6) {
      meta.season = 'fall'
    } else {
      meta.season = 'spring'
    }
  }
  meta.h = 's'
  if (meta.on && meta.season === 'spring') {
    meta.h = 'n'
  }
  if (!meta.on && meta.season === 'fall') {
    meta.h = 'n'
  }
  return meta
}

const fetchZone = (tz) => {
  const zone = {
    tz,
    o: iana[tz]
  }
  const lines = sh.exec(`zdump -v /usr/share/zoneinfo/${tz} | grep ${year}`).toString().split('\n')
  lines
    .filter((str) => str)
    .forEach((str) => {
      const o = parseLine(str)
      if (o.season) {
        zone[o.season] = o.date
      }
      zone.h = o.h
    })
  const obj = {
    tz,
    o: iana[tz],
    h: zone.h
  }
  if (zone.spring && zone.fall) {
    if (zone.h === 'n') {
      obj.dst = zone.spring + ' -> ' + zone.fall
    } else {
      obj.dst = zone.fall + ' -> ' + zone.spring
    }
  }
  if (!obj.h) {
    if (obj.tz.match('^(Australia|Antarctica|America/Argentina)/')) {
      obj.h = 's'
    }
    if (obj.tz.match('^(Canada|Europe|Asia)/')) {
      obj.h = 'n'
    }
  }
  return obj
}

const prefixCompress = (obj) => {
  const result = {}
  const keys = Object.keys(obj)
  keys.forEach((k) => {
    const name = k.split('/')
    result[name[0]] = result[name[0]] || {}
    result[name[0]][name[1]] = result[name[0]][name[1]] || {}
    let tmp = obj[k]
    delete tmp.name
    //reduce to number if no dst
    if (obj[k].dst === undefined) {
      tmp = obj[k].o
    }
    result[name[0]][name[1]] = tmp
  })
  return result
}

const doAll = () => {
  let all = whitelist.reduce((h, tz) => {
    const o = fetchZone(tz, year)
    h[o.tz] = {
      o: o.o,
      h: o.h
    }
    if (o.dst) {
      h[o.tz].dst = o.dst
    }
    if (!o.dst) {
      delete o.dst
    }
    if (!o.h) {
      delete o.h
    }
    // console.log(o)
    // console.log('\n')
    return h
  }, {})
  console.log('==========\n\n\n')
  console.log(all)

  console.log('compressing...')
  all = prefixCompress(all)

  const stuff = JSON.stringify(all, null, 2)

  const src = `./data/zonefile.json`
  writeFileSync(src, stuff, 'utf8')
  console.log('done!')
}

doAll(year)
// console.log(parseLine('/usr/share/zoneinfo/Europe/Belgrade  Sun Mar 26 01:00:00 2017 UT = Sun Mar 26 03:00:00 2017 CEST isdst=1 gmtmin=7200'));
// console.log(parseLine('/usr/share/zoneinfo/America/Mexico_City  Sun Apr  2 07:59:59 2017 UT = Sun Apr  2 01:59:59 2017 CST isdst=0 gmtmin=-21600'));
// console.log(fetchZone('Canada/Pacific', 2017));
// console.log(fetchZone('Europe/Belgrade', 2017));
// console.log(fetchZone('Australia/Sydney', 2017));
// console.log(fetchZone('Africa/Windhoek', 2017));
