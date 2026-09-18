# Updating timezone data

`npm run build:tz` reads the installed zoneinfo database with `zdump -i` and
writes a review candidate at `zonefile.YYYY.js` in the repository root. It does
not download tzdata. Install current tzdata first, or supply a compiled database
with `--zoneinfo-dir`. The `zdump` executable must support `-i` and `-c`.

```sh
npm run build:tz -- --year 2026 --check
npm run build:tz -- --year 2026 --output /tmp/zonefile.2026.js
# After reviewing the reported changes, update the input consumed by pack:
npm run build:tz -- --year 2026 --output zonefile/iana.js
npm run pack
```

The default year is the current UTC year. Source version information is read
from `+VERSION` or `tzdata.zi` when available and recorded in the generated file.
An unknown version is reported explicitly. The entry point is `scripts/tz/update.js`.

Console output groups field-level changes, unsupported zones with reasons, and a
summary of changed/unchanged/unsupported counts. Terminal output uses colors;
redirected output is plain text. Set `NO_COLOR=1` to disable colors explicitly.

`--check` writes nothing and exits 1 if records differ or any zone is unsupported.
Other runs refuse to write if there are unsupported zones. Pass
`--allow-unsupported` to explicitly retain their existing records while updating
supported zones; those retained zone names are recorded in the output header.
Missing zones, command failures, and malformed output always fail the build.
Writes use a temporary file in the output directory followed by a rename.

The extractor applies the library's existing aliases and resolves keys to the
actual case of on-disk names, including names with multiple path components.
Directory-only legacy keys without an alias are reported as unsupported; they
must never be interpreted as UTC. Files must have a compiled TZif header.
It reads the initial
interval and every transition within the requested UTC year. Fixed-offset zones
receive their actual offset and lose obsolete DST rules. Offset-only changes
count as changes.

The runtime format is intentionally limited: it stores one offset inside a
single annual interval, another outside it, and whole-hour local boundaries
measured **before** each clock change. `.offset` is the inside (usually July)
offset, not necessarily standard time. The generator validates the cycle against
the hemisphere and the runtime's supported shift (normally one hour, half an
hour for Lord Howe, two hours for Troll). It does not guess geographic hemisphere
from DST flags. Single permanent moves during the target year, extra seasonal
changes, incompatible DST flags, and minute/second boundaries are reported as
unsupported. They require a deliberate data-model/runtime change or an explicit
preservation choice. Generating a year does not add historical timezone support.
