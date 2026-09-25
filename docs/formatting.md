
## Formatting

### `format(token)` — named tokens

```js
s.format('nice')        // 'Apr 1st, 4:32pm'
s.format('nice-year')   // 'Apr 1st, 2017'
s.format('time')        // '5:01am'
s.format('time-24')     // '17:01'
s.format('month')       // 'April'
s.format('month-short') // 'Apr'
s.format('month-pad')   // '04'
s.format('numeric-uk')  // '02/03/2017' (dd/mm/yyyy)
s.format('numeric-us')  // '03/02/2017' (mm/dd/yyyy)
s.format('iso')         // '2017-04-03T08:00:00.000-04:00'
s.format('iso-utc')     // ISO in UTC
s.format('iso-full')    // '2011-12-03T10:15:30.010+01:00[Europe/Paris]' (RFC 9557)
s.format('sql')         // '2011-12-03 10:15:30' (ISO 9075)
```

Common tokens (each has sensible variants — see `src/methods/format/index.js`
for the full list): `day, day-short, day-number, day-ordinal, day-pad, date,
date-ordinal, date-pad, month, month-short, month-number, month-ordinal,
month-pad, year, year-short, time, time-24, hour, hour-24, minute, second,
millisecond, ampm, quarter, season, era, timezone, offset, numeric, numeric-us,
numeric-uk, mm/dd, iso, iso-short, iso-utc, iso-full, sql, nice, nice-year,
nice-day, nice-full`.

### Inline templates with `{}`

Any named token works inside `{ }`:

```js
s.format('{year}-{month-pad}-{date-pad}') // '2018-03-02'
s.format("{hour} o'clock")                // "2 o'clock"
s.format('{time}{ampm} sharp')            // '2:30pm sharp'
```

### `unixFmt(pattern)` — Unicode/Moment-style tokens

```js
s.unixFmt('yyyy.MM.dd h:mm a')  // '2017.Nov.16 11:34 AM'
```

Tokens: `y yy yyy yyyy yyyyy` (year), `MMMM MMM MM M` (month), `dd d` (date),
`eeee…e` (weekday), `a` (am/pm), `h hh` (12h hour), `H HH` (24h), `m mm`
(minute), `s ss` (second), `z…zzzz` (timezone). See `src/methods/format/unixFmt.js`.

### Other helpers

```js
s.iso()           // ISO-8601 string (also a setter: s.iso('...'))
s.isoFull()       // RFC 9557 extended ISO with [tz]
s.toNativeDate()  // -> native JS Date (drops back to local tz)
s.toLocalDate()   // DEPRECATED alias of toNativeDate()
s.log()           // pretty-print to console, returns self (debug)
```
