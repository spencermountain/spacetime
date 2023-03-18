`8.0.0` is our first major change since this library was created 5 years ago. 
Unlike our other technically-breaking changes, a v8 upgrade may require changes for some percentage of users.
We apologize, but insist that these changes are worthwhile.

**highlights**
* even smaller - split into `spacetime/one`, `spacetime/two`, and `spacetime/three`
* faster - some operations are 2x
* fixes unfixable [#235](https://github.com/spencermountain/spacetime/issues/235) bug, involving reckoning near a DST change
* supports DST changes in different years, using folk patterns instead of hard-coded dates
* dropping use of js Date object completely, with an eye for a future wasm version

### 1-based months ‼️
yeah. actually doing this. 
Javascript notoriously uses 0-based months, and 1-based dates. No one else does. This library was originally built as a thin wrapper for the js Date object, so copied this pattern. In version 8, we are dropping the js Date completely, and it is the right time to bite this bullet. Many github issues were created suggesting the value of `.month()` was wrong. It's clear that it needs to change.

The good news is that many spacetime methods already did a +1 for you. `.iso()` and `.unixFmt()` will work the same. String parsing is also unchanged. Many users will not notice the change:
```js
// this is unchanged 
spacetime('2023-02-12').add(2,'months').iso() // 👍 2023-04-12
```

The change is most-acute when using object or array inputs:
```js
// 🚨 new behavior in v8 🚨
spacetime({year:2023, month:1}).monthName() //'January'
spacetime([2023, 1]).monthName() //'January'
spacetime().month(1).monthName() //'January'

spacetime().month('jan').month() // 1
```
While a gross change, things are now more inline with intuition, and the library gets better, going forward.

### /one /two /three
now that package.json exports are widely supported, it makes it much easier to create partial builds. You still `npm install spacetime`, but you can buy-in only as far as you need to:

* `spacetime/one` 20kb - all date-math, no timezones
* `spacetime/two` 30kb - IANA timezones
* `spacetime/three` 40kb - sunlight calculation, play/pause, holidays

by default, both `require` and `import` use `spacetime/two`. Methods in `spacetime/three` did not exist in spacetime v7.

### Date validity
Built to be accomodating, v7 would create an invalid date if you asked it to. `'December 32'` would become 'Jan 1'.
Spacetime is now unwilling to create an invalid date or time. It will now throw an error, on `spacetime('2023-42')`, or `.time('foo')`.
You can disable this with:
```js
// should spacetime crash when it gets an unparsable date?
spacetime.world.config.throwUnparsedDate = false
// should spacetime crash when it gets an unknown timezone?
spacetime.world.config.throwUnknownTz = false
```

### Config -> .world
v7 had a `.plugin()` scheme that allowed making some minor changes and configurations. In v8 we open the barndoor, and allow full and wild abuse of all defaults and assumptions.

```js
console.log(spacetime.world) //open the lid

// go nuts
spacetime.world.zones['Foo/Bar'] = { offset: 2 }
spacetime('4pm', 'Foo/Bar').offset() // 2

// pretend it's 1970
spacetime.world.methods.now = ()=> 0
spacetime.now().iso() // 1970-01-01..

// misspell february
spacetime.world.model.month[2].shortForm = 'Freb'

// make every year a leap
spacetime.world.methods.isLeapYear = ()=> true
```



