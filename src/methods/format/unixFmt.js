import { formatTimezone, zeroPad as pad } from '../../fns.js'
//parse this insane unix-time-templating thing, from the 19th century
//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns

//time-symbols we support
const mapping = {
  G: (s) => s.era(),
  GG: (s) => s.era(),
  GGG: (s) => s.era(),
  GGGG: (s) => (s.era() === 'AD' ? 'Anno Domini' : 'Before Christ'),
  //year
  y: (s) => s.year(),
  yy: (s) => {
    //last two chars
    return pad(Number(String(s.year()).substr(2, 4)))
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
  MM: (s) => pad(s.month() + 1),
  MMM: (s) => s.format('month-short'),
  MMMM: (s) => s.format('month'),

  //week
  w: (s) => s.week(),
  ww: (s) => pad(s.week()),
  //week of month
  // W: (s) => s.week(),

  //date of month
  d: (s) => s.date(),
  dd: (s) => pad(s.date()),
  //date of year
  D: (s) => s.dayOfYear(),
  DD: (s) => pad(s.dayOfYear()),
  DDD: (s) => pad(s.dayOfYear(), 3),

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
  hh: (s) => pad(s.h12()),
  H: (s) => s.hour(),
  HH: (s) => pad(s.hour()),
  // j: (s) => {},//weird hour format

  m: (s) => s.minute(),
  mm: (s) => pad(s.minute()),
  s: (s) => s.second(),
  ss: (s) => pad(s.second()),

  //milliseconds
  SSS: (s) => pad(s.millisecond(), 3),
  //milliseconds in the day
  A: (s) => s.epoch - s.startOf('day').epoch,
  //timezone
  z: (s) => s.timezone().name,
  zz: (s) => s.timezone().name,
  zzz: (s) => s.timezone().name,
  zzzz: (s) => s.timezone().name,
  Z: (s) => formatTimezone(s.timezone().current.offset),
  ZZ: (s) => formatTimezone(s.timezone().current.offset),
  ZZZ: (s) => formatTimezone(s.timezone().current.offset),
  ZZZZ: (s) => formatTimezone(s.timezone().current.offset, ':')
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

const unixFmt = (s, str) => {
  let arr = str.split('')
  // support character escaping
  arr = escapeChars(arr)
  //combine 'yyyy' as string.
  arr = combineRepeated(arr)
  return arr.reduce((txt, c) => {
    if (mapping[c] !== undefined) {
      txt += mapping[c](s) || ''
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
