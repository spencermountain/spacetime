<div align="center">
  <div><b>spacetime-week-start</b></div>
  <div>identify the appropriate start of a week</div>
  <div><code>npm install spacetime-week-start</code></div>
  <div align="center">
    <sub>
      by
      <a href="https://github.com/spencermountain">Spencer Kelly</a>
    </sub>
  </div>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>
<!--2nd row-->
<div align="center">
  <div>
    <a href="https://npmjs.org/package/spacetime-week-start">
    <img src="https://img.shields.io/npm/v/spacetime-week-start.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=spacetime-week-start">
    <img src="https://badgen.net/bundlejs/min/spacetime-week-start" />
  </a>
  </div>
</div>

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

The start of a week varies officially in different countries.

This is a plugin for the [spacetime](https://github.com/spencermountain/spacetime) library, to help understand week-starts/ends, by country or timezone.

It does some opinionated guesswork to determine the most appropriate week-start, when a timezone is given.

It returns an english name of the day used in javascript.

### Usage

```js
import spacetime from 'spacetime'
import weekStart from 'spacetime-week-start'
spacetime.extend(weekStart)

let s = spacetime.now('Europe/Berlin')

// with no argument, it uses the timezone of the spacetime object
s.weekStart()
// { day: 'monday', country: 'germany' }

// or, look up a country by name
s.weekStart('canada')
// { day: 'sunday', country: 'canada' }

s.weekStart('iran')
// { day: 'saturday', country: 'iran' }
```

The `weekStart` method accepts one optional argument - the name of a country:

- you don't have to supply the full name of a country - part of the name is enough (f.e. instead of _united states of america_ just _united states_, or a unique part of the name, like _ted sta_)
- the country name can be in any case (lower, upper, camel case)
- if the country lookup is successful, it returns a simple object:

```js
s.weekStart('united states')
// { day: 'sunday', country: 'united states of america' }
```

- some timezones have general names, such as `gmt`, `utc` or `zulu`. These return:

```js
spacetime.now('Etc/Zulu').weekStart()
// { day: 'monday', location: 'zulu' }
```

- if you supply a non-string, `null`, `undefined`, an unknown name, or no argument at all, it returns the first day of the week for the object's timezone

### Used various sources to determine most accurate guess:

- [First Day of the Week in Different Countries](http://chartsbin.com/view/41671)
- [CLDR - Unicode Common Locale Data Repository](http://cldr.unicode.org/)
- [CLDR - day and week data file](http://unicode.org/repos/cldr/trunk/common/supplemental/supplementalData.xml)
- [Wikipedia - Workweek and weekend](https://en.wikipedia.org/wiki/Workweek_and_weekend)
- [Time & Date](https://www.timeanddate.com/worldclock/)
- [Time zone converter](http://www.timezoneconverter.com/index.php)

MIT
