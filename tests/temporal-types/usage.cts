import spacetime = require('spacetime/temporal')
const s = spacetime('2024-01-01', 'UTC')
const native: Temporal.ZonedDateTime | null = s.toTemporal()
const iso: string = s.iso()
spacetime.fromUnixSeconds(0, 'UTC').add(1, 'fortnight')
// @ts-expect-error No hemisphere metadata exists in the Temporal entry.
s.hemisphere()
// @ts-expect-error No minimum-date static helper exists here.
spacetime.min()
void [native, iso]
