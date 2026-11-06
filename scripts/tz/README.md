# Updating timezone data

`pnpm run build:tz` downloads a tzdata release from IANA, compiles it with the
local `zic`, reads every zone in `zonefile/iana.js` with `zdump -i`, reports what
changed, and rewrites `zonefile/iana.js`. Review the result with `git diff`, then
`pnpm build` to repack and bundle. `awk`, `tar`, `zic` and `zdump` must be installed
(they are on macOS and most Linux distributions).

Configuration is three constants at the top of `scripts/tz/index.js`:

- `year` — the calendar year whose transitions are extracted. The runtime stores
  one year's boundaries and applies them to every year, so this should be the
  current year. The script refuses to run once the constant falls behind.
- `version` — an IANA release name such as `2026f`, or `latest`. The release
  actually inside the tarball is what gets recorded as `tzdbVersion`.
- `ignore` — zones, keyed by year, that the runtime cannot model for that year.
  Their existing records are kept without a warning. Entries are year-scoped so
  every decision is re-examined when `year` is bumped; an ignored zone that
  normalizes cleanly is reported so the entry can be removed.

Releases come from `https://data.iana.org/time-zones/releases/tzdata<version>.tar.gz`
and are compiled in **rearguard** form, which keeps positive DST flags for Ireland,
Morocco and similar zones. This matches what system zoneinfo ships and what the
runtime's hemisphere model expects; the main form would flag those zones as
unsupported.

## Reading the report

- **Changes** — field-level before/after for each zone whose record changed.
- **Unsupported** — zones whose transitions do not fit the runtime's model (one
  annual cycle of whole-minute boundaries, or a fixed offset). Their existing
  records are kept and listed in the file header. Fix the data model, hand-edit
  the record, or add the zone to `ignore` once you have decided how to handle it.
- **Not in iana.js** — canonical tzdb zones with neither a record nor an alias.
- **Ignored but now supported** — stale `ignore` entries to remove.

Read, parse and command failures always abort without writing.

## Data format

Each record stores the offset **inside** one annual interval (`offset`), the
hemisphere (`hem`), and two whole-minute local boundaries measured on the clock
**before** each change (`dst`). For northern zones `offset` is therefore the
summer offset; London is `offset: 1, dst: '03/29:01->10/25:02'`. A midnight
fall-back is spelled as the end of the previous day (`10/24:24`, never
`10/25:00`); a midnight spring-forward keeps `:00`. Equivalent spellings of an
unchanged boundary are preserved from the existing record.

Permanent offset changes mid-year cannot be expressed, so those zones are usually
hand-set to their final fixed offset and added to `ignore` for that year.
