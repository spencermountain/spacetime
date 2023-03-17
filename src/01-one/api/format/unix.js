import { titleCase, zeroPad, ordinal } from './_lib.js'
import f from './formats.js'
// import { formatTimezone } from '../../fns.js'
//parse this insane unix-time-templating thing, from the 19th century
//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns

//time-symbols we support
const mapping = {
  G: (s) => s.era(),
  GG: (s) => s.era(),
  GGG: (s) => s.era(),
  GGGG: (s) => (s.era() === 'AD' ? 'Anno Domini' : 'Before Christ'),
  //year
  y: (_, cal) => cal.year,
  yy: (s) => zeroPad(Number(String(s.year()).substring(2, 4))), //last two chars
  yyy: (_, cal) => cal.year,
  yyyy: (_, cal) => cal.year,
  yyyyy: (_, cal) => '0' + cal.year,
  // u: (s) => {},//extended non-gregorian years

  //quarter
  Q: (s) => s.quarter(),
  QQ: (s) => s.quarter(),
  QQQ: (s) => s.quarter(),
  QQQQ: (s) => s.quarter(),

  //month
  M: (_, cal) => cal.month,
  MM: (_, cal) => zeroPad(cal.month),
  MMM: (s) => s.monthName(),
  MMMM: (s) => titleCase(s.monthName()),

  //week
  w: (s) => s.week(),
  ww: (s) => zeroPad(s.week()),
  //week of month
  // W: (s) => s.week(),

  //date of month
  d: (_, cal) => cal.date,
  dd: (_, cal) => zeroPad(cal.date),
  //date of year
  D: (s) => s.dayOfYear(),
  DD: (s) => zeroPad(s.dayOfYear()),
  DDD: (s) => zeroPad(s.dayOfYear(), 3),

  // F: (s) => {},//date of week in month
  // g: (s) => {},//modified julian day

  //day
  E: (s) => f['day-short'](s),
  EE: (s) => f['day-short'](s),
  EEE: (s) => f['day-short'](s),
  EEEE: (s) => f['day'](s),
  EEEEE: (s) => f['day'](s)[0],
  e: (s) => f['day'](s),
  ee: (s) => f['day'](s),
  eee: (s) => f['day-short'](s),
  eeee: (s) => f['day'](s),
  eeeee: (s) => f['day'](s)[0],

  //am/pm
  a: (s) => s.ampm().toUpperCase(),
  aa: (s) => s.ampm().toUpperCase(),
  aaa: (s) => s.ampm().toUpperCase(),
  aaaa: (s) => s.ampm().toUpperCase(),

  //hour
  h: (s) => s.hour12(),
  hh: (s) => zeroPad(s.hour12()),
  H: (_, cal) => cal.hour,
  HH: (_, cal) => zeroPad(cal.hour),
  // j: (s) => {},//weird hour format

  m: (_, cal) => cal.minute,
  mm: (_, cal) => zeroPad(cal.minute),
  s: (_, cal) => cal.second,
  ss: (_, cal) => zeroPad(cal.second),

  //milliseconds
  SSS: (s) => zeroPad(s.millisecond(), 3),
  //milliseconds into the day
  A: (s) => s.epoch - s.startOf('day').epoch,
  //timezone
  z: (s) => s.tz,
  zz: (s) => s.tz,
  zzz: (s) => s.tz,
  zzzz: (s) => s.tz,
  Z: (s) => f.offset(s).replace(/:/, ''),
  ZZ: (s) => f.offset(s).replace(/:/, ''),
  ZZZ: (s) => f.offset(s).replace(/:/, ''),
  ZZZZ: (s) => f.offset(s)
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

const unixFmt = (s, str, cal) => {
  let arr = str.split('')
  // support character escaping
  arr = escapeChars(arr)
  //combine 'yyyy' as strins.
  arr = combineRepeated(arr)
  return arr.reduce((txt, c) => {
    if (mapping[c] !== undefined) {
      txt += String(mapping[c](s, cal) || '')
    } else {
      // 'unescape'
      if (/^'.+'$/.test(s)) {
        c = c.replace(/'/g, '')
      }
      txt += c
    }
    return txt
  }, '')
}
export default unixFmt
