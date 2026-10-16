# Formatting

Use `format()` for named formats and templates, or `unixFmt()` for Unicode-style
patterns. For numeric values, use [getters](./getters.md) or `.json()`.

```js
import spacetime from 'spacetime'

// Every example below uses this reference date:
const s = spacetime('2017-04-03T17:01:00', 'America/New_York')

s.format('day-short') // 'Mon'
s.format('on {day-short} {date-pad}') // 'on Mon 03'
```

### Pre-built formats

| Token | Example | Aliases | Notes |
| --- | --- | --- | --- |
| `numeric` | `2017/04/03` | `ymd`, `yyyy/mm/dd`, `big-endian` | yyyy/mm/dd |
| `numeric-us` | `04/03/2017` | `mdy`, `mm/dd/yyyy` | mm/dd/yyyy |
| `numeric-uk` | `03/04/2017` | `dd/mm/yyyy`, `dmy`, `little-endian` | dd/mm/yyyy |
| `mm/dd` | `04/03` |  |  |
| `iso` | `2017-04-03T17:01:00.000-04:00` | `iso 8601` |  |
| `iso-short` | `2017-04-03` |  |  |
| `iso-utc` | `2017-04-03T21:01:00.000Z` |  | same instant in UTC |
| `iso-full` | `2017-04-03T17:01:00.000-04:00[America/New_York]` |  |  |
| `sql` | `2017-04-03 17:01:00` | `iso 9075` | no timezone offset |
| `nice` | `Apr 3rd, 5:01pm` | `nice-short` |  |
| `nice-24` | `Apr 3rd, 17:01` | `nice-short-24` |  |
| `nice-year` | `Apr 3rd, 2017` |  |  |
| `nice-day` | `Mon Apr 3rd` | `day-nice` |  |
| `nice-full` | `Monday April 3rd, 5:01pm` |  |  |
| `nice-full-24` | `Monday April 3rd, 17:01` |  |  |

### Specific fields

| Token | Example | Aliases | Notes |
| --- | --- | --- | --- |
| `day` | `Monday` | `day-name` |  |
| `day-short` | `Mon` |  |  |
| `day-number` | `1` | `day-num` | weekday number (Sunday = 0) |
| `day-ordinal` | `1st` |  | weekday ordinal (Sunday = 0) |
| `day-pad` | `01` |  | padded weekday number (Sunday = 0) |
| `date` | `3` |  | day of the month |
| `date-ordinal` | `3rd` |  |  |
| `date-pad` | `03` |  |  |
| `month` | `April` | `month-name` |  |
| `month-short` | `Apr` |  |  |
| `month-number` | `3` | `month-num` | zero-based month |
| `month-ordinal` | `3rd` |  | zero-based month ordinal |
| `month-pad` | `03` |  | padded zero-based month |
| `iso-month` | `04` | `month-iso` | padded one-based month |
| `year` | `2017` |  |  |
| `year-short` | `'17` |  | includes a leading apostrophe |
| `iso-year` | `2017` | `year-iso` |  |
| `time` | `5:01pm` | `time-12`, `time-h12` |  |
| `time-24` | `17:01` | `time-h24` |  |
| `hour` | `5` |  | 12-hour clock |
| `hour-pad` | `05` |  | padded 12-hour clock |
| `hour-24` | `17` |  | 24-hour clock |
| `hour-24-pad` | `17` |  | padded 24-hour clock |
| `minute` | `1` |  |  |
| `minute-pad` | `01` |  |  |
| `second` | `""` |  | empty string when seconds are zero |
| `second-pad` | `00` |  |  |
| `millisecond` | `""` |  | empty string when milliseconds are zero |
| `millisecond-pad` | `000` |  |  |
| `ampm` | `pm` |  |  |
| `AMPM` | `PM` |  |  |
| `quarter` | `Q2` |  |  |
| `season` | `Spring` |  |  |
| `era` | `AD` |  |  |
| `timezone` | `America/New_York` | `tz`, `iana` |  |
| `offset` | `-04:00` |  |  |

## Inline templates with `{}`

Named tokens and aliases also work inside braces. `{time}` already includes AM/PM.
Use `iso-month` for a one-based padded month; `month-pad` is zero-based.

- `'{iso-year}-{iso-month}-{date-pad}'`  →  ***2017-04-03***
- `"{hour} o'clock"`  →  ***5 o'clock***
- `'{time} sharp'`  →  ***5:01pm sharp***
- `'{day}, {month} {date-ordinal}, {year}'`  →  ***Monday, April 3rd, 2017***
- `'{hour-24-pad}:{minute-pad}:{second-pad}'`  →  ***17:01:00***

## `unixFmt(pattern)` — all supported Unicode-style tokens

This is a separate token system from `format()`, using the same `s` defined above.
Tokens are case-sensitive. The list includes every supported token and alias;
other Moment or Unicode tokens may not be supported. `""` means an empty string.

| Token | Example | Aliases | Notes |
| --- | --- | --- | --- |
| `G` | `AD` | `GG`, `GGG` | era |
| `GGGG` | `Anno Domini` |  | full era name |
| `y` | `2017` | `Y`, `yyy`, `YYY`, `yyyy`, `YYYY` | year |
| `yy` | `17` | `YY` | two-digit year |
| `yyyyy` | `02017` |  | year with a leading zero |
| `Q` | `2` | `q`, `QQ`, `qq`, `QQQ`, `qqq`, `QQQQ`, `qqqq` | quarter number |
| `M` | `4` | `L` | one-based month |
| `MM` | `04` | `LL` | padded one-based month |
| `MMM` | `Apr` | `LLL` | short month name |
| `MMMM` | `April` | `LLLL` | full month name |
| `w` | `14` |  | week of the year |
| `ww` | `14` |  | padded week of the year |
| `d` | `3` |  | day of the month |
| `dd` | `03` |  | padded day of the month |
| `D` | `93` |  | day of the year |
| `DD` | `93` |  | day of the year, at least two digits |
| `DDD` | `093` |  | day of the year, three digits |
| `E` | `Mon` | `EE`, `EEE`, `eee`, `ccc` | short weekday name |
| `EEEE` | `Monday` | `eeee`, `cccc` | full weekday name |
| `EEEEE` | `M` | `eeeee` | first letter of weekday |
| `e` | `1` | `c`, `ee`, `cc` | weekday number (Sunday = 0) |
| `a` | `PM` | `aa`, `aaa`, `aaaa` | AM/PM |
| `h` | `5` | `K` | 12-hour clock |
| `hh` | `05` | `KK` | padded 12-hour clock |
| `H` | `17` | `k` | 24-hour clock |
| `HH` | `17` | `kk` | padded 24-hour clock |
| `m` | `1` |  | minute |
| `mm` | `01` |  | padded minute |
| `s` | `""` | `S` | second; empty string when zero |
| `ss` | `00` | `SS` | padded second |
| `SSS` | `000` |  | milliseconds, three digits |
| `A` | `61260000` |  | elapsed milliseconds since the start of the day |
| `z` | `America/New_York` | `v`, `zz`, `vv`, `zzz`, `vvv`, `zzzz`, `vvvv` | timezone name |
| `Z` | `-0400` | `V`, `ZZ`, `VV`, `ZZZ`, `VVV` | UTC offset without colon |
| `ZZZZ` | `-04:00` | `VVVV` | UTC offset with colon |

Combine tokens into a pattern, and quote literal text with single quotes.
Use `''` outside quoted text for a literal apostrophe.

- `s.unixFmt("yyyy.MM.dd h:mm a")`  →  ***2017.04.03 5:01 PM***
- `s.unixFmt("yyyy.MMM.dd h:mm a")`  →  ***2017.Apr.03 5:01 PM***
- `s.unixFmt("yyyy-MM-dd'T'HH:mm:ss ZZZZ")`  →  ***2017-04-03T17:01:00 -04:00***
- `s.unixFmt("h 'hours' a")`  →  ***5 hours PM***
- `s.unixFmt("''")`  →  ***'***

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
