# Spacetime

> spacetime is a zero-dependency JavaScript library for working with dates across
> timezones. It does timezone math (DST, leap years, hemispheres) **without** the
> `Intl` API, and exposes a Moment-like, mostly **immutable** API (see exceptions below).

## Mental model

```js
import spacetime from 'spacetime'

let s = spacetime('March 1 2012 3:22pm', 'America/New_York')
const time = s.time() //'3:22pm'
s = s.time('4:20pm') // modify the time
s = s.goto('America/Los_Angeles') // change the timezone
s.time() // '1:20pm'  (same instant, west-coast clock)

const dec31 = s.endOf('year')
const until = s.diff(dec31, 'days')

const out = s.format('{day-short} {month} {date-ordinal}, {time}') // 'Thu March 1st, 1:20pm'
```

## Docs

- [start here](./docs/README.md) - overview and task index
- [API](./docs/API.md) - full method list
- [inputs](./docs/inputs.md) - date/time parsing and supported formats
- [getters](./docs/getters.md) - getting specific datetime information
- [setters](./docs/setters.md) - modifying the datetime
- [formatting](./docs/formatting.md) - customizable output formats
- [timezones](./docs/timezones.md) - setting and changing iana zones
- [comparisons](./docs/comparisons.md) - utility functions on datetimes
- [plugins](./docs/plugins.md) - extending or changing spacetime behaviour

---

# Development

Unless given specific instruction:

- Do not edit README or add documentation
- do not install or change dependencies
- do not change existing tests
- do not make a commit or PR

Work on the current branch. The user may make simultaneous changes. Verify their work is not overwritten, or ask permission before destructive git changes.

### Code style

- Write maintainable javascript, using esmodules
- Write portable ES2022+ for browers and Node>=18
- Typescript and jsdoc are not required
- Add terse comments for maintainability
- Prefer functions assigned with const, over declarations
- Do not use unbracketed if statements
- Do not use complex, multi-line, or nested ternary operators
- Avoid while loops when possible
- Prefer older for loops, unless an await is required
- File-size is always important
- Defensive try/catch blocks are not required

### Project structure

- Prefer pnpm over npm
- eslint is always configured
- Prefer small maintainable files with one purpose
- Split out utility functions into a _lib.js file or ./_lib dir
- Prefer `export default` on files with one export
- Prefer clear exports at the bottom of files
- If workflow is sequential, prefix filenames with 01-, 02-, ...
- Prefer tape-formatted tests
- Use process.env for any secrets, tokens, or keys
