# spacetime usage guide

spacetime works with dates and timezones using bundled timezone data. Start here
when generating code; use the topic pages for signatures and examples.

```js
import spacetime from 'spacetime'

const original = spacetime('2024-01-15T09:00:00', 'America/New_York')
const tomorrow = original.add(1, 'day')
const london = tomorrow.goto('Europe/London')
london.time() // '2:00pm'
original.format('iso-short') // '2024-01-15' (unchanged)
```

## Essential rules

- Capture returned dates: `s = s.add(1, 'day')`. Most setters are immutable;
  see [mutation exceptions](./edge-cases.md#mutation-and-shared-state).
- Months are **0–11**; dates are **1–31**. `[2024, 0, 15]` means January 15.
- Epoch numbers are **milliseconds**. Use `spacetime.fromUnixSeconds(seconds)`
  for seconds. `s.epoch` and `s.tz` are properties, not methods.
- Pass an explicit timezone for predictable results. The constructor is
  `spacetime(input, timezone, options)`; current-date helpers use `now(timezone)`.
- `goto(tz)` preserves the instant; `timezone(tz)` preserves wall-clock values.
- `offset()` returns **minutes**; `timezone().current.offset` returns **hours**.

## Find the right page

| Task | Guide |
| --- | --- |
| Look up a method signature or return value | [API reference](./API.md) |
| Parse strings, arrays, objects, or epochs | [Inputs](./inputs.md) |
| Read date fields and check validity | [Getters](./getters.md) |
| Set fields, add time, or round dates | [Setters](./setters.md) |
| Produce strings or native Dates | [Formatting](./formatting.md) |
| Convert zones or inspect offsets | [Timezones](./timezones.md) |
| Compare dates, measure differences, or iterate | [Comparisons](./comparisons.md) |
| Extend the API or change language data | [Plugins](./plugins.md) |
| Handle DST, month ends, invalid inputs, and shared state | [Edge cases](./edge-cases.md) |

Examples use default English language data. Import `spacetime` as shown above
before running examples from the topic pages; each code block defines its own dates.
