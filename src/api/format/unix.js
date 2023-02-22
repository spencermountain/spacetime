import { zeroPad } from './_lib.js'
import g from '../getter/index.js'
import f from './formats.js'
import getEpoch from '../../compute/epoch/index.js'


// import { formatTimezone } from '../../fns.js'
//parse this insane unix-time-templating thing, from the 19th century
//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns

//time-symbols we support
const mapping = {
  G: (c) => g.era(c),
  GG: (c) => g.era(c),
  GGG: (c) => g.era(c),
  GGGG: (c) => (g.era(c) === 'AD' ? 'Anno Domini' : 'Before Christ'),
  //year
  y: (c) => c.year,
  yy: (c) => zeroPad(Number(String(c.year).substring(2, 4))), //last two chars
  yyy: (c) => c.year,
  yyyy: (c) => c.year,
  yyyyy: (c) => '0' + c.year,
  // u: (c) => {},//extended non-gregorian years

  //quarter
  Q: (c) => g.quarter(c),
  QQ: (c) => g.quarter(c),
  QQQ: (c) => g.quarter(c),
  QQQQ: (c) => g.quarter(c),

  //month
  M: (c) => c.month + 1,
  MM: (c) => zeroPad(c.month + 1),
  MMM: (c) => f['month-short'](c),
  MMMM: (c) => g.monthName(c),

  //week
  w: (c) => s.week(),
  ww: (c) => zeroPad(s.week()),
  //week of month
  // W: (c) => s.week(),

  //date of month
  d: (c) => c.date,
  dd: (c) => zeroPad(c.date),
  //date of year
  D: (c) => g.dayOfYear(c),
  DD: (c) => zeroPad(g.dayOfYear(c)),
  DDD: (c) => zeroPad(g.dayOfYear(c), 3),

  // F: (c) => {},//date of week in month
  // g: (c) => {},//modified julian day

  //day
  E: (c) => f['day-short'](c),
  EE: (c) => f['day-short'](c),
  EEE: (c) => f['day-short'](c),
  EEEE: (c) => f['day'](c),
  EEEEE: (c) => f['day'](c)[0],
  e: (c) => f['day'](c),
  ee: (c) => f['day'](c),
  eee: (c) => f['day-short'](c),
  eeee: (c) => f['day'](c),
  eeeee: (c) => f['day'](c)[0],

  //am/pm
  a: (c) => g.ampm(c).toUpperCase(),
  aa: (c) => g.ampm(c).toUpperCase(),
  aaa: (c) => g.ampm(c).toUpperCase(),
  aaaa: (c) => g.ampm(c).toUpperCase(),

  //hour
  h: (c) => g.hour12(c),
  hh: (c) => zeroPad(g.hour12(c)),
  H: (c) => c.hour,
  HH: (c) => zeroPad(c.hour),
  // j: (c) => {},//weird hour format

  m: (c) => c.minute,
  mm: (c) => zeroPad(c.minute),
  s: (c) => c.second,
  ss: (c) => zeroPad(c.second),

  //milliseconds
  SSS: (c) => zeroPad(c.millisecond, 3),
  //milliseconds into the day
  A: (c) => {
    let morn = Object.assign({}, c, { hour: 0, minute: 0, second: 0, millisecond: 0 })
    return getEpoch(c) - getEpoch(morn)
  },
  //timezone
  z: (_, tz) => tz,
  zz: (_, tz) => tz,
  zzz: (_, tz) => tz,
  zzzz: (_, tz) => tz,
  Z: (c) => f.offset(c).replace(/:/, ''),
  ZZ: (c) => f.offset(c).replace(/:/, ''),
  ZZZ: (c) => f.offset(c).replace(/:/, ''),
  ZZZZ: (c) => f.offset(c)
}

const addAlias = (char, to, n) => {
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

// support unix-style escaping with ' character
const escapeChars = function (arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === `'`) {
      // greedy-search for next apostrophe
      for (let o = i + 1; o < arr.length; o += 1) {
        if (arr[o]) {
          arr[i] += arr[o]
        }
        if (arr[o] === `'`) {
          arr[o] = null
          break
        }
        arr[o] = null
      }
    }
  }
  return arr.filter((ch) => ch)
}

//combine consecutive chars, like 'yyyy' as one.
const combineRepeated = function (arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let c = arr[i]
    // greedy-forward
    for (let o = i + 1; o < arr.length; o += 1) {
      if (arr[o] === c) {
        arr[i] += arr[o]
        arr[o] = null
      } else {
        break
      }
    }
  }
  // '' means one apostrophe
  arr = arr.filter((ch) => ch)
  arr = arr.map((str) => {
    if (str === `''`) {
      str = `'`
    }
    return str
  })
  return arr
}

const unixFmt = (cal, str, tz) => {
  let arr = str.split('')
  // support character escaping
  arr = escapeChars(arr)
  //combine 'yyyy' as string.
  arr = combineRepeated(arr)
  return arr.reduce((txt, c) => {
    if (mapping[c] !== undefined) {
      txt += mapping[c](cal, tz) || ''
    } else {
      // 'unescape'
      if (/^'.+'$/.test(c)) {
        c = c.replace(/'/g, '')
      }
      txt += c
    }
    return txt
  }, '')
}
export default unixFmt
