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

- `s.format("numeric")` → `"2017/04/03"` — yyyy/mm/dd
  - `s.format("ymd")` → `"2017/04/03"` — alias of `numeric`
  - `s.format("yyyy/mm/dd")` → `"2017/04/03"` — alias of `numeric`
  - `s.format("big-endian")` → `"2017/04/03"` — alias of `numeric`
- `s.format("numeric-us")` → `"04/03/2017"` — mm/dd/yyyy
  - `s.format("mdy")` → `"04/03/2017"` — alias of `numeric-us`
  - `s.format("mm/dd/yyyy")` → `"04/03/2017"` — alias of `numeric-us`
  - `s.format("dd/mm/yyyy")` → `"04/03/2017"` — alias of `numeric-us`; currently uses US order despite its name (use `numeric-uk` for day/month/year)
- `s.format("numeric-uk")` → `"03/04/2017"` — dd/mm/yyyy
  - `s.format("dmy")` → `"03/04/2017"` — alias of `numeric-uk`
  - `s.format("little-endian")` → `"03/04/2017"` — alias of `numeric-uk`
- `s.format("mm/dd")` → `"04/03"`
- `s.format("iso")` → `"2017-04-03T17:01:00.000-04:00"`
  - `s.format("iso 8601")` → `"2017-04-03T17:01:00.000-04:00"` — alias of `iso`
- `s.format("iso-short")` → `"2017-04-03"`
- `s.format("iso-utc")` → `"2017-04-03T21:01:00.000Z"` — same instant in UTC
- `s.format("iso-full")` → `"2017-04-03T17:01:00.000-04:00[America/New_York]"` — includes the bracketed timezone name
- `s.format("sql")` → `"2017-04-03 17:01:00"` — no timezone offset
  - `s.format("iso 9075")` → `"2017-04-03 17:01:00"` — alias of `sql`
- `s.format("nice")` → `"Apr 3rd, 5:01pm"`
  - `s.format("nice-short")` → `"Apr 3rd, 5:01pm"` — alias of `nice`
- `s.format("nice-24")` → `"Apr 3rd, 17:01"`
  - `s.format("nice-short-24")` → `"Apr 3rd, 17:01"` — alias of `nice-24`
- `s.format("nice-year")` → `"Apr 3rd, 2017"`
- `s.format("nice-day")` → `"Mon Apr 3rd"`
  - `s.format("day-nice")` → `"Mon Apr 3rd"` — alias of `nice-day`
- `s.format("nice-full")` → `"Monday April 3rd, 5:01pm"`
- `s.format("nice-full-24")` → `"Monday April 3rd, 17:01"`

### Specific fields

- `s.format("day")` → `"Monday"`
  - `s.format("day-name")` → `"Monday"` — alias of `day`
- `s.format("day-short")` → `"Mon"`
- `s.format("day-number")` → `"1"` — weekday number (Sunday = 0)
  - `s.format("day-num")` → `"1"` — alias of `day-number`
- `s.format("day-ordinal")` → `"1st"` — weekday ordinal (Sunday = 0)
- `s.format("day-pad")` → `"01"` — padded weekday number (Sunday = 0)

- `s.format("date")` → `"3"` — day of the month
- `s.format("date-ordinal")` → `"3rd"`
- `s.format("date-pad")` → `"03"`

- `s.format("month")` → `"April"`
  - `s.format("month-name")` → `"April"` — alias of `month`
- `s.format("month-short")` → `"Apr"`
- `s.format("month-number")` → `"3"` — zero-based month
  - `s.format("month-num")` → `"3"` — alias of `month-number`
- `s.format("month-ordinal")` → `"3rd"` — zero-based month ordinal
- `s.format("month-pad")` → `"03"` — padded zero-based month
- `s.format("iso-month")` → `"04"` — padded one-based month
  - `s.format("month-iso")` → `"04"` — alias of `iso-month`

- `s.format("year")` → `"2017"`
- `s.format("year-short")` → `"'17"` — includes a leading apostrophe
- `s.format("iso-year")` → `"2017"`
  - `s.format("year-iso")` → `"2017"` — alias of `iso-year`

- `s.format("time")` → `"5:01pm"`
  - `s.format("time-12")` → `"5:01pm"` — alias of `time`
  - `s.format("time-h12")` → `"5:01pm"` — alias of `time`
- `s.format("time-24")` → `"17:01"`
  - `s.format("time-h24")` → `"17:01"` — alias of `time-24`
- `s.format("hour")` → `"5"` — 12-hour clock
- `s.format("hour-pad")` → `"05"` — padded 12-hour clock
- `s.format("hour-24")` → `"17"` — 24-hour clock
- `s.format("hour-24-pad")` → `"17"` — padded 24-hour clock
- `s.format("minute")` → `"1"`
- `s.format("minute-pad")` → `"01"`
- `s.format("second")` → `""` — empty string when seconds are zero
- `s.format("second-pad")` → `"00"`
- `s.format("millisecond")` → `""` — empty string when milliseconds are zero
- `s.format("millisecond-pad")` → `"000"`
- `s.format("ampm")` → `"pm"`
- `s.format("AMPM")` → `"PM"`

- `s.format("quarter")` → `"Q2"`
- `s.format("season")` → `"Spring"`
- `s.format("era")` → `"AD"`

- `s.format("timezone")` → `"America/New_York"`
  - `s.format("tz")` → `"America/New_York"` — alias of `timezone`
  - `s.format("iana")` → `"America/New_York"` — alias of `timezone`
- `s.format("offset")` → `"-04:00"`

## Inline templates with `{}`

Named tokens and aliases also work inside braces. `{time}` already includes AM/PM.
Use `iso-month` for a one-based padded month; `month-pad` is zero-based.

- `s.format("{iso-year}-{iso-month}-{date-pad}")` → `"2017-04-03"`
- `s.format("{hour} o'clock")` → `"5 o'clock"`
- `s.format("{time} sharp")` → `"5:01pm sharp"`
- `s.format("{day}, {month} {date-ordinal}, {year}")` → `"Monday, April 3rd, 2017"`
- `s.format("{hour-24-pad}:{minute-pad}:{second-pad}")` → `"17:01:00"`

## `unixFmt(pattern)` — all supported Unicode-style tokens

This is a separate token system from `format()`, using the same `s` defined above.
Tokens are case-sensitive. The list includes every supported token and alias;
other Moment or Unicode tokens may not be supported. `""` means an empty string.

- `s.unixFmt("G")` → `"AD"` — era
- `s.unixFmt("GG")` → `"AD"` — era
- `s.unixFmt("GGG")` → `"AD"` — era
- `s.unixFmt("GGGG")` → `"Anno Domini"` — full era name

- `s.unixFmt("y")` → `"2017"` — year
  - `s.unixFmt("Y")` → `"2017"` — alias of `y` (year)
- `s.unixFmt("yy")` → `"17"` — two-digit year
  - `s.unixFmt("YY")` → `"17"` — alias of `yy` (two-digit year)
- `s.unixFmt("yyy")` → `"2017"` — year
  - `s.unixFmt("YYY")` → `"2017"` — alias of `yyy` (year)
- `s.unixFmt("yyyy")` → `"2017"` — year
  - `s.unixFmt("YYYY")` → `"2017"` — alias of `yyyy` (year)
- `s.unixFmt("yyyyy")` → `"02017"` — year with a leading zero

- `s.unixFmt("Q")` → `"2"` — quarter number
  - `s.unixFmt("q")` → `"2"` — alias of `Q` (quarter number)
- `s.unixFmt("QQ")` → `"2"` — quarter number
  - `s.unixFmt("qq")` → `"2"` — alias of `QQ` (quarter number)
- `s.unixFmt("QQQ")` → `"2"` — quarter number
  - `s.unixFmt("qqq")` → `"2"` — alias of `QQQ` (quarter number)
- `s.unixFmt("QQQQ")` → `"2"` — quarter number
  - `s.unixFmt("qqqq")` → `"2"` — alias of `QQQQ` (quarter number)

- `s.unixFmt("M")` → `"4"` — one-based month
  - `s.unixFmt("L")` → `"4"` — alias of `M` (one-based month)
- `s.unixFmt("MM")` → `"04"` — padded one-based month
  - `s.unixFmt("LL")` → `"04"` — alias of `MM` (padded one-based month)
- `s.unixFmt("MMM")` → `"Apr"` — short month name
  - `s.unixFmt("LLL")` → `"Apr"` — alias of `MMM` (short month name)
- `s.unixFmt("MMMM")` → `"April"` — full month name
  - `s.unixFmt("LLLL")` → `"April"` — alias of `MMMM` (full month name)

- `s.unixFmt("w")` → `"14"` — week of the year
- `s.unixFmt("ww")` → `"14"` — padded week of the year

- `s.unixFmt("d")` → `"3"` — day of the month
- `s.unixFmt("dd")` → `"03"` — padded day of the month
- `s.unixFmt("D")` → `"93"` — day of the year
- `s.unixFmt("DD")` → `"93"` — day of the year, at least two digits
- `s.unixFmt("DDD")` → `"093"` — day of the year, three digits

- `s.unixFmt("E")` → `"Mon"` — short weekday name
- `s.unixFmt("EE")` → `"Mon"` — short weekday name
- `s.unixFmt("EEE")` → `"Mon"` — short weekday name
- `s.unixFmt("EEEE")` → `"Monday"` — full weekday name
- `s.unixFmt("EEEEE")` → `"M"` — first letter of weekday
- `s.unixFmt("e")` → `"1"` — weekday number (Sunday = 0)
  - `s.unixFmt("c")` → `"1"` — alias of `e` (weekday number (Sunday = 0))
- `s.unixFmt("ee")` → `"1"` — weekday number, unpadded (Sunday = 0)
  - `s.unixFmt("cc")` → `"1"` — alias of `ee` (weekday number, unpadded (Sunday = 0))
- `s.unixFmt("eee")` → `"Mon"` — short weekday name
  - `s.unixFmt("ccc")` → `"Mon"` — alias of `eee` (short weekday name)
- `s.unixFmt("eeee")` → `"Monday"` — full weekday name
  - `s.unixFmt("cccc")` → `"Monday"` — alias of `eeee` (full weekday name)
- `s.unixFmt("eeeee")` → `"M"` — first letter of weekday

- `s.unixFmt("a")` → `"PM"` — AM/PM
- `s.unixFmt("aa")` → `"PM"` — AM/PM
- `s.unixFmt("aaa")` → `"PM"` — AM/PM
- `s.unixFmt("aaaa")` → `"PM"` — AM/PM

- `s.unixFmt("h")` → `"5"` — 12-hour clock
  - `s.unixFmt("K")` → `"5"` — alias of `h` (12-hour clock)
- `s.unixFmt("hh")` → `"05"` — padded 12-hour clock
  - `s.unixFmt("KK")` → `"05"` — alias of `hh` (padded 12-hour clock)
- `s.unixFmt("H")` → `"17"` — 24-hour clock
  - `s.unixFmt("k")` → `"17"` — alias of `H` (24-hour clock)
- `s.unixFmt("HH")` → `"17"` — padded 24-hour clock
  - `s.unixFmt("kk")` → `"17"` — alias of `HH` (padded 24-hour clock)
- `s.unixFmt("m")` → `"1"` — minute
- `s.unixFmt("mm")` → `"01"` — padded minute
- `s.unixFmt("s")` → `""` — second; empty string when zero
  - `s.unixFmt("S")` → `""` — alias of `s` (second; empty string when zero)
- `s.unixFmt("ss")` → `"00"` — padded second
  - `s.unixFmt("SS")` → `"00"` — alias of `ss` (padded second)
- `s.unixFmt("SSS")` → `"000"` — milliseconds, three digits
- `s.unixFmt("A")` → `"61260000"` — elapsed milliseconds since the start of the day

- `s.unixFmt("z")` → `"America/New_York"` — timezone name
  - `s.unixFmt("v")` → `"America/New_York"` — alias of `z` (timezone name)
- `s.unixFmt("zz")` → `"America/New_York"` — timezone name
  - `s.unixFmt("vv")` → `"America/New_York"` — alias of `zz` (timezone name)
- `s.unixFmt("zzz")` → `"America/New_York"` — timezone name
  - `s.unixFmt("vvv")` → `"America/New_York"` — alias of `zzz` (timezone name)
- `s.unixFmt("zzzz")` → `"America/New_York"` — timezone name
  - `s.unixFmt("vvvv")` → `"America/New_York"` — alias of `zzzz` (timezone name)
- `s.unixFmt("Z")` → `"-0400"` — UTC offset without colon
  - `s.unixFmt("V")` → `"-0400"` — alias of `Z` (UTC offset without colon)
- `s.unixFmt("ZZ")` → `"-0400"` — UTC offset without colon
  - `s.unixFmt("VV")` → `"-0400"` — alias of `ZZ` (UTC offset without colon)
- `s.unixFmt("ZZZ")` → `"-0400"` — UTC offset without colon
  - `s.unixFmt("VVV")` → `"-0400"` — alias of `ZZZ` (UTC offset without colon)
- `s.unixFmt("ZZZZ")` → `"-04:00"` — UTC offset with colon
  - `s.unixFmt("VVVV")` → `"-04:00"` — alias of `ZZZZ` (UTC offset with colon)

Combine tokens into a pattern, and quote literal text with single quotes.
Use `''` outside quoted text for a literal apostrophe.

- `s.unixFmt("yyyy.MM.dd h:mm a")` → `"2017.04.03 5:01 PM"`
- `s.unixFmt("yyyy.MMM.dd h:mm a")` → `"2017.Apr.03 5:01 PM"`
- `s.unixFmt("yyyy-MM-dd'T'HH:mm:ss ZZZZ")` → `"2017-04-03T17:01:00 -04:00"`
- `s.unixFmt("h 'hours' a")` → `"5 hours PM"`
- `s.unixFmt("''")` → `"'"`

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
