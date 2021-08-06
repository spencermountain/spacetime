This project follows semVer, where:

- **[major]** is an API, or result-format change
- **[minor]** is a result change
- **[patch]** is a bugfix

<!-- ### [unreleased]
-->

### v6.16.3 [Aug 2021]

- **[new]** - .daysInMonth() method (thanks m1212e!)
- **[change]** - replace deprecated timezone aliases (thanks Michael!)
- **[change]** - date/day naming inconsistency in add method (thanks Andy!)
- **[fix]** - typescript fixes (thanks Adam!)
- **[fix]** - many-year add issue #235
- **[fix]** - iso format year-padding for BC years
- update deps

### v6.16.2 [June 2021]

- **[fix]** - offset for `asia/baku` #292
- **[fix]** - date-parser for #291
- update deps

### v6.16.1 [May 2021]

- **[new]** - add millisecond pad #283
- update deps

### v6.16.0 [April 2021]

- **[change]** - improvements to date-sting parsers
- **[change]** - drop ie11 polyfills in min.js build
- **[change]** - minify and stop compiling esm build

### v6.15.2 [April 2021]

- **[fix]** - .add(n, 'weekend')
- update deps

### v6.15.1 [April 2021]

- **[fix]** - Fix pacific/chatham iana DST change time (thanks Michael!)
- update deps

### v6.15.0 [April 2021]

- **[fix]** - string parsing issue for tue/tues
- **[fix]** - .time('4:88') now has ceiling of 59m
- **[new]** - add goFwd params to all (appropriate) setter methods

### v6.14.0 [March 2021]

- **[change]** - add missing timezones from indiana and argentina
- **[change]** - set old timezones as aliases of newer ones
- **[new]** - add min, max methods
- **[change]** - comment-out tests that were failing in some timezones
- update deps, and documentation

### v6.13.0 [March 2021]

- **[change]** - support more alt day formats like `.day('mo')`
- **[change]** - allow `.week()` to return 53
- **[change]** - support swapped-parameters for `.each()`
- **[change]** - support swapped-parameters for `.isSame()`
- update deps

### v6.12.5 [Feb 2021]

- **[fix]** - add/minus by quarter issue

### v6.12.4 [Feb 2021]

- **[fix]** - typescript issue

### v6.12.3 [Feb 2021]

- **[fix]** - fix .every() >= issue
- **[fix]** - fix today-passthrough in some date formats
- **[change]** - use updated DST changes (171 changes)
- **[change]** - support explicit local-timezone (thanks Mitsunee)
- **[new]** - spacetime.timezones() method
- update deps

### v6.12.2 [Dec 2020]

- **[change]** - support i18n titlecase config (thanks Kayla)
- **[fix]** - endOf('season') issue
- **[fix]** - fix character escaping issue in unixFmt method #207
  update deps

### v6.12.1 [Dec 2020]

- **[new]** - support for '97 year format
- **[change]** - support `13h00` time format
- **[change]** - support `09.13.2013` and `13.09.2013` formats
- **[fix]** - `.add()` issue sometimes effecting quarter/season

### v6.12.0 [Dec 2020]

- **[new]** - support period-seperated short-iso format
- **[new]** - support fortnight in add/remove methods
- **[new]** - support 'tues' 'thurs' in day() method
- **[new]** - support '2002-06' truncated iso input

### v6.11.0 [Nov 2020]

- **[change]** - support 6-digit millisecond, and lowercase iso
- **[change]** - first week of year must start > dec 29th
- **[fix]** - typescript fixes
- update deps

### v6.10.1 [Nov 2020]

- **[fix]** - keep yukon dst changes (for now!) #243
- **[fix]** - support new-zealand time in '13h' format #242
- update deps

### v6.10.0 [Nov 2020]

- **[fix]** - support whitespace between time and am/pm (thanks Andy!)
- **[change]** - make empty array + obj equal to null inputs #240
- **[change]** - update timezones
- **[change]** - remove Yukon DST pre-emtively

### v6.9.0 [Nov 2020]

- **[fix]** - dst-change issues like #236
- **[fix]** - inc/dec year issue on exact nye millisecond
- **[change]** support parsing quarter-names as input - 'q2 2001'
- **[change]** support parsing season-names as input - 'fall 2001'

### v6.8.0 [Oct 2020]

- **[fix]** major DST issue #182 (thanks Boris!)

### v6.7.0 [Oct 2020]

- **[fix]** add missing timezones `America/Fort_Nelson`, `Asia/Qostanay`, and `America/Nuuk`
- **[fix]** comparison issue #231 effecting `.isSame()` and `.since()` accross different timezones

### v6.6.4

- **[fix]** 45m offset formatting issue
- update deps

### v6.6.3

- **[change]** support for 'today' param with null inputs
- **[change]** support for 'today' param with 'today/tonight' inputs
- **[change]** interpret empty-string input like null input (as 'now')
- **[fix]** typescript fixes (#220 #222)
-

### v6.6.2

- **[fix]** for formatting when the output is 0 😓
- **[fix]** for leap-day in `.date()` method
- update deps
- add github release/publish script

### v6.6.1

- **[fix]** typescript fix

### v6.6.0 [June 2020]

- **[change]** support `undefined` as input (like null)
- **[fix]** for missing defaults in object input
- **[fix]** major DST add/subtract bug #193

### v6.5.0

- support `options.today`
- update deps, minor zonefile update

### v6.4.1

- run mjs build through babel (#175)

## v6.4.0 [Jan 2020]

- add `.toLocalDate()`
- update zonefile to 2020
- add Famagusta and Yangon iana zones

## v6.3.0 [Nov 2019]

- add `.decade()`
- add `.century()`
- add `.millenium()`
- add `.json()` method
- remove dst for Brazil
- fix .week() counting logic
- change overflow error-amount for #166

## v6.2.1

- fix typescript types

## v6.2.0

- add config for `dmy` british date parsing
- support `18-feb-2019` format

## v6.1.0

- support for +14 timezones.

# v6.0.0 [Aug 2019]

- remove 'informal' timezone parsing (like `.goto('south africa')`)
- remove 'display' info from `.timezone()` like 'EST' (move to [spacetime-informal](https://github.com/spencermountain/spacetime-informal/))
- throw error on an invalid timezone #150
- optimize `.week()` method

---

### 5.9.0

- add support for changing start/end of the week
- allow more flexible `.i18n()` inputs

### 5.8.0

- faster diff for large-number of months
- more support for esoteric iso formats
- add format('iso-month')
- change fallback behaviour for set failure edge-cases

### 5.7.0

- avoid setting dates/months/hours past maximums and minimums
- `.hour(24)` now changes date to tomorrow
- faster diffs for large (decade-long) ranges
- **[big]** fix awkward diff/since issues ('dec 25->jan 5' should be 0 years)

### 5.6.0

- support typescript types by Jacob Craig
- use given timezone when given a spacetime object as an input
- adds `.every(unit, to)` method
- set UTC as default fallback timezone

### 5.4.0

- support more time input formats
- fixes offset input issue [#103](https://github.com/spencermountain/spacetime/issues/103)

### 5.3.0

- added more iana timezones
- fixed zero-padding in iso offsets
- support half hour offsets in iso formats

### 5.2.0

- `next()` and `last()` methods
- support for century and decades
- full-api tests and docs

### 5.1.0

- titlecase short-forms of months, days in `.format()`
- support implicit date in `nov 2019`
- support `tues March 5th 2018` inputs
- pretty-dramatic speed optimizations (~50%)

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

---

### v4.5.0

- update a few TZ offsets in mostly eastern-Russia
- updates to 2019 Palestinian dst dates
- fixes for missing immutable setter methods

### v4.4.0

- **big** - swap interpretation of ISO date offsets `-0500 → +5 offset` [#61](https://github.com/spencermountain/spacetime/issues/61)

### v4.3.0

- assume current year with input `spacetime('July 5th')`
- do larger `.diff()` operations (gt 1yr) in fast-mode
- support BC formatting of input and in `s.format('year')`
- bug fix for iso-format hour-offsets (#58)

### v4.2.2

- adds `.extend()` method for authoring plugins

## v4.2.0

- fix dayOfYear regression on 31st days
- support space in ISO-186 format
- update deps, use babel-env

## v4.1.0

- fix 'February 30th' regression
- remove denormalized `.valid` boolean on Spacetime class

## v4.0.1

- support `.from()` and `.fromNow()` methods

### v4.0.0

- `format(iso)` now uses `.` for millisecond separator: `2016-11-04T09:00:59.122Z`
- adds `.since()` method to calculate a human-readable diff
- support string/number input to `.diff()`
- support ordinal inputs, like `June 5th 2018`
- isAwake() method
- alias for .plus() .minus() methods
- `.diff()` without a unit does a couple units together
- update zonefile to proper dst-flip time

---

### v3.2.0

- update zonefile to 2018 dst dates

### v3.1.0

- dramatic speedup by optimizing walkTo method

## v3.0.1

- fallback to UTC, instead of PST if no `Intl` is present
- support passing-in offsets as ISO_8601 date-strings
- add epoch-seconds warning msg
- allow getting/setting new timezones

---

## v2.1.0

- support unix/unicode time-formating basic-level
- add `.era()` get/set method
- found 6 or 7 wrong offsets

## v2.0.0

- fix major [southern-hemisphere issue](https://github.com/spencermountain/spacetime/issues/27)
- re-structure `d.timezone()` response
- add `.hemisphere()` method
- use proper short-day forms

---

## v1.3.2

- fix for inf-loop regression on DST-switch

## v1.3.1

- adds `spacetime.i18n()` method
- adds `spacetime.nearest()` method
- support for `"quarterHour"` units - '4:15, 4:30, 4:45, 5:00' etc

## v1.3.0

- adds `spacetime.whereIts()` method
- actually implement 😓 season by hemisphere

## v1.2.0

- adds isBetween() method

# v1.0.0 :rocket:
