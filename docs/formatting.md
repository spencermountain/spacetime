# Formatting

In addition to structured json output, `spacetime` can output date/time strings of any custom form. This document describes the different methods to accomplish this.

Every example below uses this reference date:
```js
const s = spacetime('2017-04-03T17:01:00', 'America/New_York')

let str = s.format('iso-short') //"2017-04-03"
console.log(str)

let str2 = s.format('day-short') //"Mon"
```

Call any of these mthods with `s.format('token')` or together as `s.format('{token1} {token2}')` 

### Pre-built formats

- `s.format("numeric")` → **2017/04/03** — *yyyy/mm/dd*
  - alias `"ymd"`
  - alias `"yyyy/mm/dd"`
  - alias `"big-endian"`
- `s.format("numeric-us")` → **04/03/2017** — *mm/dd/yyyy*
  - alias `"mdy"`
  - alias `"mm/dd/yyyy"`
  - alias `"dd/mm/yyyy"` — *currently uses US order despite its name (use `numeric-uk` for day/month/year)*
- `s.format("numeric-uk")` → **03/04/2017** — *dd/mm/yyyy*
  - alias `"dmy"`
  - alias `"little-endian"`
- `s.format("mm/dd")` → **04/03**
- `s.format("iso")` → **2017-04-03T17:01:00.000-04:00**
  - alias `"iso 8601"`
- `s.format("iso-short")` → **2017-04-03**
- `s.format("iso-utc")` → **2017-04-03T21:01:00.000Z** — *same instant in UTC*
- `s.format("iso-full")` → **2017-04-03T17:01:00.000-04:00[America/New_York]** — *includes the bracketed timezone name*
- `s.format("sql")` → **2017-04-03 17:01:00** — *no timezone offset*
  - alias `"iso 9075"`
- `s.format("nice")` → **Apr 3rd, 5:01pm**
  - alias `"nice-short"`
- `s.format("nice-24")` → **Apr 3rd, 17:01**
  - alias `"nice-short-24"`
- `s.format("nice-year")` → **Apr 3rd, 2017**
- `s.format("nice-day")` → **Mon Apr 3rd**
  - alias `"day-nice"`
- `s.format("nice-full")` → **Monday April 3rd, 5:01pm**
- `s.format("nice-full-24")` → **Monday April 3rd, 17:01**

### Specific fields

- `s.format("day")` → **Monday**
  - alias `"day-name"`
- `s.format("day-short")` → **Mon**
- `s.format("day-number")` → **1** — *weekday number (Sunday = 0)*
  - alias `"day-num"`
- `s.format("day-ordinal")` → **1st** — *weekday ordinal (Sunday = 0)*
- `s.format("day-pad")` → **01** — *padded weekday number (Sunday = 0)*

- `s.format("date")` → **3** — *day of the month*
- `s.format("date-ordinal")` → **3rd**
- `s.format("date-pad")` → **03**

- `s.format("month")` → **April**
  - alias `"month-name"`
- `s.format("month-short")` → **Apr**
- `s.format("month-number")` → **3** — *zero-based month*
  - alias `"month-num"`
- `s.format("month-ordinal")` → **3rd** — *zero-based month ordinal*
- `s.format("month-pad")` → **03** — *padded zero-based month*
- `s.format("iso-month")` → **04** — *padded one-based month*
  - alias `"month-iso"`

- `s.format("year")` → **2017**
- `s.format("year-short")` → **'17** — *includes a leading apostrophe*
- `s.format("iso-year")` → **2017**
  - alias `"year-iso"`

- `s.format("time")` → **5:01pm**
  - alias `"time-12"`
  - alias `"time-h12"`
- `s.format("time-24")` → **17:01**
  - alias `"time-h24"`
- `s.format("hour")` → **5** — *12-hour clock*
- `s.format("hour-pad")` → **05** — *padded 12-hour clock*
- `s.format("hour-24")` → **17** — *24-hour clock*
- `s.format("hour-24-pad")` → **17** — *padded 24-hour clock*
- `s.format("minute")` → **1**
- `s.format("minute-pad")` → **01**
- `s.format("second")` → **""** — *empty string when seconds are zero*
- `s.format("second-pad")` → **00**
- `s.format("millisecond")` → **""** — *empty string when milliseconds are zero*
- `s.format("millisecond-pad")` → **000**
- `s.format("ampm")` → **pm**
- `s.format("AMPM")` → **PM**

- `s.format("quarter")` → **Q2**
- `s.format("season")` → **Spring**
- `s.format("era")` → **AD**

- `s.format("timezone")` → **America/New_York**
  - alias `"tz"`
  - alias `"iana"`
- `s.format("offset")` → **-04:00**

## Inline templates with `{}`

Named tokens and aliases also work inside braces. `{time}` already includes AM/PM.
Use `iso-month` for a one-based padded month; `month-pad` is zero-based.

- `s.format("{iso-year}-{iso-month}-{date-pad}")` → **2017-04-03**
- `s.format("{hour} o'clock")` → **5 o'clock**
- `s.format("{time} sharp")` → **5:01pm sharp**
- `s.format("{day}, {month} {date-ordinal}, {year}")` → **Monday, April 3rd, 2017**
- `s.format("{hour-24-pad}:{minute-pad}:{second-pad}")` → **17:01:00**

## `unixFmt(pattern)` — all supported Unicode-style tokens

This is a separate token system from `format()`, using the same `s` defined above.
Tokens are case-sensitive. The list includes every supported token and alias;
other Moment or Unicode tokens may not be supported. `""` means an empty string.

- `s.unixFmt("G")` → **AD** — *era*
- `s.unixFmt("GG")` → **AD** — *era*
- `s.unixFmt("GGG")` → **AD** — *era*
- `s.unixFmt("GGGG")` → **Anno Domini** — *full era name*

- `s.unixFmt("y")` → **2017** — *year*
  - alias `"Y"`
- `s.unixFmt("yy")` → **17** — *two-digit year*
  - alias `"YY"`
- `s.unixFmt("yyy")` → **2017** — *year*
  - alias `"YYY"`
- `s.unixFmt("yyyy")` → **2017** — *year*
  - alias `"YYYY"`
- `s.unixFmt("yyyyy")` → **02017** — *year with a leading zero*

- `s.unixFmt("Q")` → **2** — *quarter number*
  - alias `"q"`
- `s.unixFmt("QQ")` → **2** — *quarter number*
  - alias `"qq"`
- `s.unixFmt("QQQ")` → **2** — *quarter number*
  - alias `"qqq"`
- `s.unixFmt("QQQQ")` → **2** — *quarter number*
  - alias `"qqqq"`

- `s.unixFmt("M")` → **4** — *one-based month*
  - alias `"L"`
- `s.unixFmt("MM")` → **04** — *padded one-based month*
  - alias `"LL"`
- `s.unixFmt("MMM")` → **Apr** — *short month name*
  - alias `"LLL"`
- `s.unixFmt("MMMM")` → **April** — *full month name*
  - alias `"LLLL"`

- `s.unixFmt("w")` → **14** — *week of the year*
- `s.unixFmt("ww")` → **14** — *padded week of the year*

- `s.unixFmt("d")` → **3** — *day of the month*
- `s.unixFmt("dd")` → **03** — *padded day of the month*
- `s.unixFmt("D")` → **93** — *day of the year*
- `s.unixFmt("DD")` → **93** — *day of the year, at least two digits*
- `s.unixFmt("DDD")` → **093** — *day of the year, three digits*

- `s.unixFmt("E")` → **Mon** — *short weekday name*
- `s.unixFmt("EE")` → **Mon** — *short weekday name*
- `s.unixFmt("EEE")` → **Mon** — *short weekday name*
- `s.unixFmt("EEEE")` → **Monday** — *full weekday name*
- `s.unixFmt("EEEEE")` → **M** — *first letter of weekday*
- `s.unixFmt("e")` → **1** — *weekday number (Sunday = 0)*
  - alias `"c"`
- `s.unixFmt("ee")` → **1** — *weekday number, unpadded (Sunday = 0)*
  - alias `"cc"`
- `s.unixFmt("eee")` → **Mon** — *short weekday name*
  - alias `"ccc"`
- `s.unixFmt("eeee")` → **Monday** — *full weekday name*
  - alias `"cccc"`
- `s.unixFmt("eeeee")` → **M** — *first letter of weekday*

- `s.unixFmt("a")` → **PM** — *AM/PM*
- `s.unixFmt("aa")` → **PM** — *AM/PM*
- `s.unixFmt("aaa")` → **PM** — *AM/PM*
- `s.unixFmt("aaaa")` → **PM** — *AM/PM*

- `s.unixFmt("h")` → **5** — *12-hour clock*
  - alias `"K"`
- `s.unixFmt("hh")` → **05** — *padded 12-hour clock*
  - alias `"KK"`
- `s.unixFmt("H")` → **17** — *24-hour clock*
  - alias `"k"`
- `s.unixFmt("HH")` → **17** — *padded 24-hour clock*
  - alias `"kk"`
- `s.unixFmt("m")` → **1** — *minute*
- `s.unixFmt("mm")` → **01** — *padded minute*
- `s.unixFmt("s")` → **""** — *second; empty string when zero*
  - alias `"S"`
- `s.unixFmt("ss")` → **00** — *padded second*
  - alias `"SS"`
- `s.unixFmt("SSS")` → **000** — *milliseconds, three digits*
- `s.unixFmt("A")` → **61260000** — *elapsed milliseconds since the start of the day*

- `s.unixFmt("z")` → **America/New_York** — *timezone name*
  - alias `"v"`
- `s.unixFmt("zz")` → **America/New_York** — *timezone name*
  - alias `"vv"`
- `s.unixFmt("zzz")` → **America/New_York** — *timezone name*
  - alias `"vvv"`
- `s.unixFmt("zzzz")` → **America/New_York** — *timezone name*
  - alias `"vvvv"`
- `s.unixFmt("Z")` → **-0400** — *UTC offset without colon*
  - alias `"V"`
- `s.unixFmt("ZZ")` → **-0400** — *UTC offset without colon*
  - alias `"VV"`
- `s.unixFmt("ZZZ")` → **-0400** — *UTC offset without colon*
  - alias `"VVV"`
- `s.unixFmt("ZZZZ")` → **-04:00** — *UTC offset with colon*
  - alias `"VVVV"`

Combine tokens into a pattern, and quote literal text with single quotes.
Use `''` outside quoted text for a literal apostrophe.

- `s.unixFmt("yyyy.MM.dd h:mm a")` → **2017.04.03 5:01 PM**
- `s.unixFmt("yyyy.MMM.dd h:mm a")` → **2017.Apr.03 5:01 PM**
- `s.unixFmt("yyyy-MM-dd'T'HH:mm:ss ZZZZ")` → **2017-04-03T17:01:00 -04:00**
- `s.unixFmt("h 'hours' a")` → **5 hours PM**
- `s.unixFmt("''")` → **'**

## Other helpers

These examples also use the same `s` defined above.

```js
s.iso() // '2017-04-03T17:01:00.000-04:00'
s.isoFull() // '2017-04-03T17:01:00.000-04:00[America/New_York]'
s.toNativeDate().getTime() === s.epoch // true
```

`iso(value)` and `isoFull(value)` parse a new date and return a new object.
`toNativeDate()` preserves the instant; native Date objects do not retain the
IANA timezone, and their local getters use the host timezone. `toLocalDate()`
is a deprecated alias. `log()` prints a date for debugging and returns the receiver.
