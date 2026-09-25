## Extending & i18n

```js
// Add custom instance methods (use `function`, not arrow, to keep `this`):
spacetime.extend({
  isHappyHour: function () { return this.hour() === 16 }
})
spacetime.now().isHappyHour() // false

// Plugins are installed the same way:
spacetime.extend(require('timezone-soft')) // enables s.goto('milwaukee'), 'GMT+8', etc.

// Non-English output:
s = s.i18n({
  days:   { long: ['domingo', ...], short: ['dom', ...] },
  months: { long: [...], short: ['ene', 'feb', ...] },
  ampm:   { am: 'a.m.', pm: 'p.m.' }
})
```

Official plugins live in `plugins/`: `age`, `daylight`, `geo`, `holiday`,
`week-of-month`, `week-start`, `ticks`, and more.
