<div align="center">
  <div>
    <h2>spacetime-week</h2>
  </div>
  <div>
    calculate the start of a week
  </div>
  <a href="https://npmjs.org/package/spacetime-week">
    <img src="https://img.shields.io/npm/v/spacetime-week.svg?style=flat-square" />
  </a>
  <a href="https://unpkg.com/spacetime/builds/spacetime-week.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/spacetime-week/master/builds/spacetime-week.min.js" />
  </a>
  <div>
    <sup>
      By <a href="https://github.com/MartinSpd">Martin Spodniak</a> and <a href="https://github.com/spencermountain">Spencer Kelly</a>
    </sup>
  </div>
  <hr/>
</div>

The start of a week varies officially in different countries.

This is a library to help understand week-starts/ends, by country or timezone.

It does some opinionated guesswork to determine the most appropriate week-start, when a timezone is given.

It returns an english name of the day used in javascript.

It is built for use in/with the [spacetime](https://github.com/spencermountain/spacetime) library

Main function `weekStart` determines when week start in the current time zone or given coutry:
- it accepts one optional argument - string name of the country
- you don't have to supply full name of a country - it's enough write part of name (f.e. instead of *united states of america* just *united states* or unique part of name, like f.e. *ted sta*)
- if searching for country name is successful it returns a simple JSON object for better clarification what is in output, looking f.e.:
```js
{ day: 'sunday', country: 'united states of america' }
```
- function also accepts text in any case (lower, upper, camel case)
- just to make it easy for you write lower cased country name
- there are some time zones with general names, such as `gmt`, `utc` or `zulu`. These returns `JSON` such as:
```js
{ day: 'monday', location: 'zulu' }
```
- if you write as argument different type as string, `null`, `undefined` or supply no argument at all it returns first day of weeek for current time zone
- it uses `spacetime` library to determine current time zone only and rest is distinct for searching first day of week

`npm i spacetime-week`

```js
const s = require('spacetime-week')

console.log('#1: ', s.weekStart());
console.log('#2: ', s.weekStart(12));
console.log('#3: ', s.weekStart(null));
console.log('#4: ', s.weekStart(''));
console.log('#5: ', s.weekStart(undefined));
console.log('#6: ', s.weekStart('abc'));
// all returns results for current tz, f.e. { day: 'sunday', country: 'canada' }

console.log('#7: ', weekStart('slovakia'));
// tz: europe/bratislava
// { day: 'monday', country: 'slovakia' }

console.log('#8: ', weekStart('iran'));
//tz: asia/tehran
// { day: 'saturday', country: 'iran' }

console.log('#9: ', weekStart('canAda'));
//tz: f.e. america/montreal
// { day: 'sunday', country: 'canada' }

console.log('#10: ', weekStart('lize'));
// tz: america/belize
// { day: 'monday', country: 'belize' }

console.log('#11: ', weekStart('el salvador'));
// tz: america/el_salvador
// { day: 'monday', country: 'el salvador' }

console.log('#12: ', weekStart('zulu'));
// tz: etc/zulu
// { day: 'monday', location: 'zulu' }

console.log('#13: ', weekStart('gmt'));
// tz: f.e. etc/gmt
// { day: 'monday', location: 'gmt' }

console.log('#14: ', weekStart('antarctica'));
// tz: f.e. antarctica/south_pole
// { day: 'monday', location: 'antarctica' }

console.log('#15: ', weekStart('arctic'));
// tz: f.e. arctic/longyearbyen
// { day: 'monday', location: 'arctic' }
```

### Used various sources to determine most accurate guess:

- [First Day of the Week in Different Countries](http://chartsbin.com/view/41671)
- [CLDR - Unicode Common Locale Data Repository](http://cldr.unicode.org/)
- [CLDR - day and week data file](http://unicode.org/repos/cldr/trunk/common/supplemental/supplementalData.xml)
- [Wikipedia - Workweek and weekend](https://en.wikipedia.org/wiki/Workweek_and_weekend)
- [Time & Date](https://www.timeanddate.com/worldclock/)
- [Time zone converter](http://www.timezoneconverter.com/index.php)

work-in-progress

MIT
