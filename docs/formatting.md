# Formatting

Import `spacetime` as shown in the [usage guide](./README.md).

## `format(token)` — named tokens

```js
const s = spacetime('2017-04-03T17:01:00', 'America/New_York')
s.format('nice') // 'Apr 3rd, 5:01pm'
s.format('nice-year') // 'Apr 3rd, 2017'
s.format('time') // '5:01pm'
s.format('time-24') // '17:01'
s.format('month') // 'April'
s.format('month-short') // 'Apr'
s.format('month-pad') // '03' (ZERO-based month)
s.format('iso-month') // '04' (ONE-based month)
s.format('numeric-uk') // '03/04/2017' (dd/mm/yyyy)
s.format('numeric-us') // '04/03/2017' (mm/dd/yyyy)
s.format('iso') // '2017-04-03T17:01:00.000-04:00'
s.format('iso-utc') // '2017-04-03T21:01:00.000Z'
s.format('iso-full') // '2017-04-03T17:01:00.000-04:00[America/New_York]'
s.format('sql') // '2017-04-03 17:01:00'
```

Common tokens: `day`, `day-short`, `day-number`, `day-ordinal`, `day-pad`,
`date`, `date-ordinal`, `date-pad`, `month`, `month-short`, `month-number`,
`month-ordinal`, `month-pad`, `iso-month`, `year`, `year-short`, `iso-year`,
`time`, `time-24`, `hour`, `hour-24`, `minute`, `second`, `millisecond`, `ampm`,
`quarter`, `season`, `era`, `timezone`, `offset`, `numeric`, `numeric-us`,
`numeric-uk`, `mm/dd`, `iso`, `iso-short`, `iso-utc`, `iso-full`, `sql`,
`nice`, `nice-year`, `nice-day`, and `nice-full`.

See the [token implementation](../src/methods/format/index.js) for the full list.
`iso-full` includes a bracketed timezone name (RFC 9557); `sql` has no offset.

## Inline templates with `{}`

```js
const s = spacetime('2018-03-02T14:30:00', 'UTC')
s.format('{iso-year}-{iso-month}-{date-pad}') // '2018-03-02'
s.format("{hour} o'clock") // "2 o'clock"
s.format('{time} sharp') // '2:30pm sharp'
```

Named tokens work inside braces. `{time}` already includes AM/PM. Use
`iso-month` for a one-based padded month; `month-pad` is zero-based.

## `unixFmt(pattern)` — Unicode-style tokens

```js
const s = spacetime('2017-11-16T11:34:00', 'UTC')
s.unixFmt('yyyy.MM.dd h:mm a') // '2017.11.16 11:34 AM'
s.unixFmt('yyyy.MMM.dd h:mm a') // '2017.Nov.16 11:34 AM'
```

This is a separate token system from `format()`. Do not assume every Moment
or Unicode token is supported. Common tokens: `yyyy` (year), `MMMM MMM MM M`
(month), `dd d` (date), `eeee` (weekday name), `a` (AM/PM), `h hh` (12-hour),
`H HH` (24-hour), `m mm` (minute), `s ss` (second), `SSS` (milliseconds), and
`z` (timezone name). See the [token implementation](../src/methods/format/unixFmt.js).

## Other helpers

```js
const s = spacetime('2024-01-15T09:00:00', 'America/New_York')
s.iso() // '2024-01-15T09:00:00.000-05:00'
s.isoFull() // '2024-01-15T09:00:00.000-05:00[America/New_York]'
s.toNativeDate().getTime() === s.epoch // true
```

`iso(value)` and `isoFull(value)` parse a new date and return a new object.
`toNativeDate()` preserves the instant; native Date objects do not retain the
IANA timezone, and their local getters use the host timezone. `toLocalDate()`
is a deprecated alias. `log()` prints a date for debugging and returns the receiver.
