# spacetime formatting cheatsheet

```js
const timestamp = spacetime('2011-12-13 12:34:56.789Z', 'UTC');
```

### using timestamp.format(...)

| argument | returns |
|----------|---------|
| `timestamp.format("ampm")` | `pm` |
| `timestamp.format("AMPM")` | `PM` |
| `timestamp.format("big-endian")` | `2011/12/13` |
| `timestamp.format("date")` | `13` |
| `timestamp.format("date-ordinal")` | `13th` |
| `timestamp.format("date-pad")` | `13` |
| `timestamp.format("day")` | `Tuesday` |
| `timestamp.format("day-name")` | `Tuesday` |
| `timestamp.format("day-nice")` | `Tue Dec 13th` |
| `timestamp.format("day-num")` | `2` |
| `timestamp.format("day-number")` | `2` |
| `timestamp.format("day-ordinal")` | `2nd` |
| `timestamp.format("day-pad")` | `02` |
| `timestamp.format("day-short")` | `Tue` |
| `timestamp.format("dd/mm/yyyy")` | `12/13/2011` |
| `timestamp.format("dmy")` | `13/12/2011` |
| `timestamp.format("era")` | `AD` |
| `timestamp.format("hour")` | `12` |
| `timestamp.format("hour-24")` | `12` |
| `timestamp.format("hour-24-pad")` | `12` |
| `timestamp.format("hour-pad")` | `12` |
| `timestamp.format("iana")` | `Etc/GMT` |
| `timestamp.format("iso")` | `2011-12-13T12:34:56.789Z` |
| `timestamp.format("iso 8601")` | `2011-12-13T12:34:56.789Z` |
| `timestamp.format("iso 9075")` | `2011-12-13 12:34:56` |
| `timestamp.format("iso-full")` | `2011-12-13T12:34:56.789Z[Etc/GMT]` |
| `timestamp.format("iso-month")` | `12` |
| `timestamp.format("iso-short")` | `2011-12-13` |
| `timestamp.format("iso-utc")` | `2011-12-13T12:34:56.789Z` |
| `timestamp.format("iso-year")` | `2011` |
| `timestamp.format("little-endian")` | `13/12/2011` |
| `timestamp.format("mdy")` | `12/13/2011` |
| `timestamp.format("millisecond")` | `789` |
| `timestamp.format("millisecond-pad")` | `789` |
| `timestamp.format("minute")` | `34` |
| `timestamp.format("minute-pad")` | `34` |
| `timestamp.format("mm/dd")` | `12/13` |
| `timestamp.format("mm/dd/yyyy")` | `12/13/2011` |
| `timestamp.format("month")` | `December` |
| `timestamp.format("month-iso")` | `12` |
| `timestamp.format("month-name")` | `December` |
| `timestamp.format("month-num")` | `11` |
| `timestamp.format("month-number")` | `11` |
| `timestamp.format("month-ordinal")` | `11th` |
| `timestamp.format("month-pad")` | `11` |
| `timestamp.format("month-short")` | `Dec` |
| `timestamp.format("nice")` | `Dec 13th, 12:34pm` |
| `timestamp.format("nice-24")` | `Dec 13th, 12:34` |
| `timestamp.format("nice-day")` | `Tue Dec 13th` |
| `timestamp.format("nice-full")` | `Tuesday December 13th, 12:34pm` |
| `timestamp.format("nice-full-24")` | `Tuesday December 13th, 12:34` |
| `timestamp.format("nice-short")` | `Dec 13th, 12:34pm` |
| `timestamp.format("nice-short-24")` | `Dec 13th, 12:34` |
| `timestamp.format("nice-year")` | `Dec 13th, 2011` |
| `timestamp.format("numeric")` | `2011/12/13` |
| `timestamp.format("numeric-uk")` | `13/12/2011` |
| `timestamp.format("numeric-us")` | `12/13/2011` |
| `timestamp.format("offset")` | `Z` |
| `timestamp.format("quarter")` | `Q4` |
| `timestamp.format("season")` | `Winter` |
| `timestamp.format("second")` | `56` |
| `timestamp.format("second-pad")` | `56` |
| `timestamp.format("sql")` | `2011-12-13 12:34:56` |
| `timestamp.format("time")` | `12:34pm` |
| `timestamp.format("time-12")` | `12:34pm` |
| `timestamp.format("time-24")` | `12:34` |
| `timestamp.format("time-h12")` | `12:34pm` |
| `timestamp.format("time-h24")` | `12:34` |
| `timestamp.format("timezone")` | `Etc/GMT` |
| `timestamp.format("tz")` | `Etc/GMT` |
| `timestamp.format("year")` | `2011` |
| `timestamp.format("year-iso")` | `2011` |
| `timestamp.format("year-short")` | `'11` |
| `timestamp.format("ymd")` | `2011/12/13` |
| `timestamp.format("yyyy/mm/dd")` | `2011/12/13` |

> special case: timestamp.format("json") returns plain object

```js
{
  "century": 21,
  "decade": 2010,
  "year": 2011,
  "month": 11,
  "date": 13,
  "day": 2,
  "hour": 12,
  "minute": 34,
  "second": 56,
  "millisecond": 789,
  "offset": 0,
  "timezone": "etc/gmt"
}
```

### using timestamp.unixFmt(...)

| argument | returns |
|----------|---------|
| `timestamp.unixFmt("a")` | `PM` |
| `timestamp.unixFmt("A")` | `45296789` |
| `timestamp.unixFmt("aa")` | `PM` |
| `timestamp.unixFmt("aaa")` | `PM` |
| `timestamp.unixFmt("aaaa")` | `PM` |
| `timestamp.unixFmt("c")` | `2` |
| `timestamp.unixFmt("cc")` | `2` |
| `timestamp.unixFmt("ccc")` | `Tue` |
| `timestamp.unixFmt("cccc")` | `Tuesday` |
| `timestamp.unixFmt("d")` | `13` |
| `timestamp.unixFmt("D")` | `347` |
| `timestamp.unixFmt("dd")` | `13` |
| `timestamp.unixFmt("DD")` | `347` |
| `timestamp.unixFmt("DDD")` | `347` |
| `timestamp.unixFmt("e")` | `2` |
| `timestamp.unixFmt("E")` | `Tue` |
| `timestamp.unixFmt("ee")` | `2` |
| `timestamp.unixFmt("EE")` | `Tue` |
| `timestamp.unixFmt("eee")` | `Tue` |
| `timestamp.unixFmt("EEE")` | `Tue` |
| `timestamp.unixFmt("eeee")` | `Tuesday` |
| `timestamp.unixFmt("EEEE")` | `Tuesday` |
| `timestamp.unixFmt("eeeee")` | `T` |
| `timestamp.unixFmt("EEEEE")` | `T` |
| `timestamp.unixFmt("G")` | `AD` |
| `timestamp.unixFmt("GG")` | `AD` |
| `timestamp.unixFmt("GGG")` | `AD` |
| `timestamp.unixFmt("GGGG")` | `Anno Domini` |
| `timestamp.unixFmt("h")` | `12` |
| `timestamp.unixFmt("H")` | `12` |
| `timestamp.unixFmt("hh")` | `12` |
| `timestamp.unixFmt("HH")` | `12` |
| `timestamp.unixFmt("k")` | `12` |
| `timestamp.unixFmt("K")` | `12` |
| `timestamp.unixFmt("kk")` | `12` |
| `timestamp.unixFmt("KK")` | `12` |
| `timestamp.unixFmt("L")` | `12` |
| `timestamp.unixFmt("LL")` | `12` |
| `timestamp.unixFmt("LLL")` | `Dec` |
| `timestamp.unixFmt("LLLL")` | `December` |
| `timestamp.unixFmt("m")` | `34` |
| `timestamp.unixFmt("M")` | `12` |
| `timestamp.unixFmt("mm")` | `34` |
| `timestamp.unixFmt("MM")` | `12` |
| `timestamp.unixFmt("MMM")` | `Dec` |
| `timestamp.unixFmt("MMMM")` | `December` |
| `timestamp.unixFmt("q")` | `4` |
| `timestamp.unixFmt("Q")` | `4` |
| `timestamp.unixFmt("qq")` | `4` |
| `timestamp.unixFmt("QQ")` | `4` |
| `timestamp.unixFmt("qqq")` | `4` |
| `timestamp.unixFmt("QQQ")` | `4` |
| `timestamp.unixFmt("qqqq")` | `4` |
| `timestamp.unixFmt("QQQQ")` | `4` |
| `timestamp.unixFmt("s")` | `56` |
| `timestamp.unixFmt("S")` | `56` |
| `timestamp.unixFmt("ss")` | `56` |
| `timestamp.unixFmt("SS")` | `56` |
| `timestamp.unixFmt("SSS")` | `789` |
| `timestamp.unixFmt("v")` | `Etc/GMT` |
| `timestamp.unixFmt("V")` | `-0000` |
| `timestamp.unixFmt("vv")` | `Etc/GMT` |
| `timestamp.unixFmt("VV")` | `-0000` |
| `timestamp.unixFmt("vvv")` | `Etc/GMT` |
| `timestamp.unixFmt("VVV")` | `-0000` |
| `timestamp.unixFmt("vvvv")` | `Etc/GMT` |
| `timestamp.unixFmt("VVVV")` | `-00:00` |
| `timestamp.unixFmt("w")` | `50` |
| `timestamp.unixFmt("ww")` | `50` |
| `timestamp.unixFmt("y")` | `2011` |
| `timestamp.unixFmt("Y")` | `2011` |
| `timestamp.unixFmt("yy")` | `11` |
| `timestamp.unixFmt("YY")` | `11` |
| `timestamp.unixFmt("yyy")` | `2011` |
| `timestamp.unixFmt("YYY")` | `2011` |
| `timestamp.unixFmt("yyyy")` | `2011` |
| `timestamp.unixFmt("YYYY")` | `2011` |
| `timestamp.unixFmt("yyyyy")` | `02011` |
| `timestamp.unixFmt("z")` | `Etc/GMT` |
| `timestamp.unixFmt("Z")` | `-0000` |
| `timestamp.unixFmt("zz")` | `Etc/GMT` |
| `timestamp.unixFmt("ZZ")` | `-0000` |
| `timestamp.unixFmt("zzz")` | `Etc/GMT` |
| `timestamp.unixFmt("ZZZ")` | `-0000` |
| `timestamp.unixFmt("zzzz")` | `Etc/GMT` |
| `timestamp.unixFmt("ZZZZ")` | `-00:00` |

