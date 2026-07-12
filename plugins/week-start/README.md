<div align="center">
  <div>
    <h2>spacetime-week-start</h2>
  </div>
  <div>
    calculate the start of a week
  </div>
  <a href="https://npmjs.org/package/spacetime-week-start">
    <img src="https://img.shields.io/npm/v/spacetime-week-start.svg?style=flat-square" />
  </a>
  <div>
    <sup>
      By <a href="https://github.com/MartinSpd">Martin Spodniak</a> and <a href="https://github.com/spencermountain">Spencer Kelly</a>
    </sup>
  </div>
  <hr/>
</div>

The start of a week varies officially in different countries.

This is a plugin for the [spacetime](https://github.com/spencermountain/spacetime) library, to help understand week-starts/ends, by country or timezone.

It does some opinionated guesswork to determine the most appropriate week-start, when a timezone is given.

It returns an english name of the day used in javascript.

`npm i spacetime-week-start`

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

- you don't have to supply the full name of a country - part of the name is enough (f.e. instead of *united states of america* just *united states*, or a unique part of the name, like *ted sta*)
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
