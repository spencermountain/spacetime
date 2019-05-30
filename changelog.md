# v5.0.0 🚨 -breaking

- 🚨 all methods now immutable by default.🚨
  -- existing code will now need to be `s = s.add(1,'day')`
  --- (instead of `s.add(1,'day')`)
- move unix-formating out of `.format()` into `.unixFmt()`
- support new `{hour} oclock`-style format templates
- change default `.format()` response to **yyyy-mm-dd**
- uppercase month and day names in `.dayName()`
- support city-names, `EST`, `PDT`, etc as input
- set default `silent: true` to avoid unwanted logging

### 5.1.0

- titlecase short-forms of months, days in `.format()`
- support implicit date in `nov 2019`
- support `tues March 5th 2018` inputs
- pretty-dramatic speed optimizations (~50%)

### 5.2.0

- `next()` and `last()` methods
- support for century and decades
- full-api tests and docs

### 5.3.0

- added more iana timezones
- fixed zero-padding in iso offsets
- support half hour offsets in iso formats

### 5.4.0

- support more time input formats
- fixes offset input issue [#103](https://github.com/spencermountain/spacetime/issues/103)

### 5.6.0

- support typescript types by Jacob Craig
- use given timezone when given a spacetime object as an input
- adds `.every(unit, to)` method
- set UTC as default fallback timezone

### 5.7.0

- avoid setting dates/months/hours past maximums and minimums
- `.hour(24)` now changes date to tomorrow
- faster diffs for large (decade-long) ranges
- **[big]** fix awkward diff/since issues ('dec 25->jan 5' should be 0 years)

### 5.8.0

- faster diff for large-number of months
- more support for esoteric iso formats
- add format('iso-month')
- change fallback behaviour for set failure edge-cases

### 5.9.0

- add support for changing start/end of the week
- allow more flexible `.i18n()` inputs

### v4.0.0

- `format(iso)` now uses `.` for millisecond separator: `2016-11-04T09:00:59.122Z`
- adds `.since()` method to calculate a human-readable diff
- support string/number input to `.diff()`
- support ordinal inputs, like `June 5th 2018`
- isAwake() method
- alias for .plus() .minus() methods
- `.diff()` without a unit does a couple units together
- update zonefile to proper dst-flip time

## v4.0.1

- support `.from()` and `.fromNow()` methods

## v4.1.0

- fix 'February 30th' regression
- remove denormalized `.valid` boolean on Spacetime class

## v4.2.0

- fix dayOfYear regression on 31st days
- support space in ISO-186 format
- update deps, use babel-env

### v4.2.2

- adds `.extend()` method for authoring plugins

### v4.3.0

- assume current year with input `spacetime('July 5th')`
- do larger `.diff()` operations (gt 1yr) in fast-mode
- support BC formatting of input and in `s.format('year')`
- bug fix for iso-format hour-offsets (#58)

### v4.4.0

- **big** - swap interpretation of ISO date offsets `-0500 → +5 offset` [#61](https://github.com/spencermountain/spacetime/issues/61)

### v4.5.0

- update a few TZ offsets in mostly eastern-Russia
- updates to 2019 Palestinian dst dates
- fixes for missing immutable setter methods

## v3.0.1

- fallback to UTC, instead of PST if no `Intl` is present
- support passing-in offsets as ISO_8601 date-strings
- add epoch-seconds warning msg
- allow getting/setting new timezones

### v3.1.0

- dramatic speedup by optimizing walkTo method

### v3.2.0

- update zonefile to 2018 dst dates

## v2.0.0

- fix major [southern-hemisphere issue](https://github.com/smallwins/spacetime/issues/27)
- re-structure `d.timezone()` response
- add `.hemisphere()` method
- use proper short-day forms

## v2.1.0

- support unix/unicode time-formating basic-level
- add `.era()` get/set method
- found 6 or 7 wrong offsets

# v1.0.0 :rocket:

## v1.2.0

- adds isBetween() method

## v1.3.0

- adds `spacetime.whereIts()` method
- actually implement 😓 season by hemisphere

## v1.3.1

- adds `spacetime.i18n()` method
- adds `spacetime.nearest()` method
- support for `"quarterHour"` units - '4:15, 4:30, 4:45, 5:00' etc

## v1.3.2

- fix for inf-loop regression on DST-switch
