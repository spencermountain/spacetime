## Timezones

```js
s = s.goto('Australia/Brisbane') // SAME moment, new wall-clock & tz
s = s.goto(null)                 // back to the local machine/browser tz
s.timezone()                     // metadata object (see TimezoneMeta below)
s = s.timezone('Europe/Zagreb')  // SETTER: keep the wall-clock numbers, swap tz

s.offset()        // current DST-aware UTC offset in HOURS (number)
s.hemisphere()    // 'North' | 'South'
s.isDST()         // is DST active right now in this tz?
s.hasDST()        // does this tz ever observe DST?
s.timezones       // property: full tz nameset
spacetime.timezones()              // static: all known tz + offsets
spacetime.whereIts('8:30pm', '9:30pm') // tz names currently in that time-window
```

**`goto` vs `timezone(str)` — do not confuse them:**
- `goto(tz)` keeps the **instant** fixed and recomputes the local time
  (3pm New York → 8pm London, same moment).
- `timezone(tz)` keeps the **clock numbers** fixed and relabels the zone
  (3pm New York → 3pm London, a different moment).

`goto()` never crosses the international date line.
