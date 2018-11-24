'use strict'
import { zeroPad } from '../../fns'
//parse this insane unix-time-templating thing, from the 19th century
//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns

//time-symbols we support
const mapping = {
  G: (s) => s.era(),
  GG: (s) => s.era(),
  GGG: (s) => s.era(),
  GGGG: (s) => s.era() === 'AD' ? 'Anno Domini' : 'Before Christ',
  //year
  y: (s) => s.year(),
  yy: (s) => { //last two chars
    return parseInt(String(s.year()).substr(2, 4), 10)
  },
  yyy: (s) => s.year(),
  yyyy: (s) => s.year(),
  yyyyy: (s) => '0' + s.year(),
  // u: (s) => {},//extended non-gregorian years

  //quarter
  Q: (s) => s.quarter(),
  QQ: (s) => s.quarter(),
  QQQ: (s) => s.quarter(),
  QQQQ: (s) => s.quarter(),

  //month
  M: (s) => s.month() + 1,
  MM: (s) => zeroPad(s.month() + 1),
  MMM: (s) => s.format('month-short'),
  MMMM: (s) => s.format('month'),

  //week
  w: (s) => s.week(),
  ww: (s) => zeroPad(s.week()),
  //week of month
  // W: (s) => s.week(),

  //date of month
  d: (s) => s.date(),
  dd: (s) => zeroPad(s.date()),
  //date of year
  D: (s) => s.dayOfYear(),
  DD: (s) => zeroPad(s.dayOfYear()),
  DDD: (s) => zeroPad(s.dayOfYear(), 3),

  // F: (s) => {},//date of week in month
  // g: (s) => {},//modified julian day

  //day
  E: (s) => s.format('day-short'),
  EE: (s) => s.format('day-short'),
  EEE: (s) => s.format('day-short'),
  EEEE: (s) => s.format('day'),
  EEEEE: (s) => s.format('day')[0],
  e: (s) => s.day(),
  ee: (s) => s.day(),
  eee: (s) => s.format('day-short'),
  eeee: (s) => s.format('day'),
  eeeee: (s) => s.format('day')[0],

  //am/pm
  a: (s) => s.ampm().toUpperCase(),
  aa: (s) => s.ampm().toUpperCase(),
  aaa: (s) => s.ampm().toUpperCase(),
  aaaa: (s) => s.ampm().toUpperCase(),

  //hour
  h: (s) => s.h12(),
  hh: (s) => zeroPad(s.h12()),
  H: (s) => s.hour(),
  HH: (s) => zeroPad(s.hour()),
  // j: (s) => {},//weird hour format

  m: (s) => s.minute(),
  mm: (s) => zeroPad(s.minute()),
  s: (s) => s.second(),
  ss: (s) => zeroPad(s.second()),
  //milliseconds in the day
  A: (s) => s.epoch - s.startOf('day').epoch,
  //timezone
  z: (s) => s.tz,
  zz: (s) => s.tz,
  zzz: (s) => s.tz,
  zzzz: (s) => s.tz,
  Z: (s) => s.timezone().current.offset + '00',
  ZZ: (s) => s.timezone().current.offset + '00',
  ZZZ: (s) => s.timezone().current.offset + '00',
  ZZZZ: (s) => s.timezone().current.offset + ':00',

}

const addAlias = function(char, to, n) {
  let name = char
  let toName = to
  for (let i = 0; i < n; i += 1) {
    mapping[name] = mapping[toName]
    name += char
    toName += to
  }
}
addAlias('q', 'Q', 4)
addAlias('L', 'M', 4)
addAlias('Y', 'y', 4)
addAlias('c', 'e', 4)
addAlias('k', 'H', 2)
addAlias('K', 'h', 2)
addAlias('S', 's', 2)
addAlias('v', 'z', 4)
addAlias('V', 'Z', 4)

const unixFmt = function(s, str) {
  let chars = str.split('')
  //combine consecutive chars, like 'yyyy' as one.
  let arr = [chars[0]]
  let quoteOn = false
  for (let i = 1; i < chars.length; i += 1) {
    //support quoted substrings
    if (chars[i] === `'`) {
      quoteOn = !quoteOn
      //support '', meaning one tick
      if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
        quoteOn = true
      } else {
        continue
      }
    }
    //merge it with the last one
    if (quoteOn === true || chars[i] === arr[arr.length - 1][0]) {
      arr[arr.length - 1] += chars[i]
    } else {
      arr.push(chars[i])
    }
  }
  return arr.reduce((txt, c) => {
    if (mapping[c] !== undefined) {
      txt += mapping[c](s) || ''
    } else {
      txt += c
    }
    return txt;
  }, '');
}
export default unixFmt
