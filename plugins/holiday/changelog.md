### Unreleased

- **[add]** `holiday.list()` returns sorted canonical names and aliases. Pass `{ year, timezone }` to include resolved dates.
- **[add]** `holiday.next(name, { from, timezone })` finds the first occurrence on or after the reference's local date, including today. It defaults to now, accepts spacetime references, and preserves the input instance.
- **[add]** Calendar rules for the last weekday of a month, a weekday preceding a date, and offsets from another holiday.
- **[add]** Memorial Day and Cyber Monday.
- **[fix]** Calculate Victoria Day as the Monday before May 25 and Black Friday as the day after Thanksgiving.
- **[fix]** Calculate Palm Sunday seven days before Easter and Trinity Sunday 56 days after Easter; preserve Easter's zero-day offset explicitly.
- **[fix]** Resolve `summer solstice`, `december solstice`, and related aliases. Retain the old `summer solistice` spelling as an alias.
- **[fix]** Return `null` for unsupported Orthodox Easter lookups instead of silently using the Western calendar. Preserve supported fixed Orthodox holidays.
- **[fix]** Determine the default year at call time in the requested timezone, rather than caching it when the module loads.
- **[fix]** Normalize apostrophes, whitespace, and aliases consistently, including `remembrance day` while retaining the old misspelling.
- **[test]** Cover calendar rules, aliases, listing isolation, next occurrences, timezone boundaries, and year rollover across source, ESM, CommonJS, and browser builds.

### 0.1.0

- **[change]** add timezone as third parameter
- update deps
