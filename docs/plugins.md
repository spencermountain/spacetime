# Extending and changing language data

Import `spacetime` as shown in the [usage guide](./README.md).

## Custom instance methods

Use a regular function so `this` is the Spacetime instance. Extensions modify
the shared prototype and are available on existing and future instances.

```js
spacetime.extend({
  isHappyHour: function () { return this.hour() === 16 }
})
const s = spacetime('2024-01-15T16:00:00', 'UTC')
s.isHappyHour() // true
```

Install compatible plugin method objects with `spacetime.extend(plugin)`.
In ESM, import the plugin; in CommonJS, use `require`. Plugins in
[the repository](../plugins/) include `age`, `daylight`, `geo`, `holiday`,
`week-of-month`, `week-start`, and `ticks`; check each plugin's own setup and API.

## Language data is shared

`i18n()` changes shared language data for all instances using this loaded copy
of spacetime, including existing instances. It returns the receiver, not an
isolated locale-specific clone. Avoid switching it per request in concurrent
applications. Supply complete arrays when replacing day or month names.

```js
const a = spacetime('2024-01-15T09:00:00', 'UTC')
const b = spacetime('2024-01-16T09:00:00', 'UTC')
a.i18n({ ampm: { am: 'a.m.', pm: 'p.m.' } })
b.time() // '9:00a.m.' (another instance is affected too)
a.i18n({ ampm: { am: 'am', pm: 'pm' } }) // restore default English markers
```

Other supported fields include `days` and `months` (each with `long` and `short`
arrays), `useTitleCase`, `distance`, and `units`. Day arrays start with Sunday;
month arrays start with January.
