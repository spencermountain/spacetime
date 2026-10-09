import spacetime from 'spacetime'
const zoned = Temporal.ZonedDateTime.from('2024-01-01T00:00Z[UTC]')
const s = spacetime(zoned)
const result: Temporal.ZonedDateTime | null = s.toTemporal()
spacetime(zoned.toInstant(), 'UTC')
spacetime(zoned.toPlainDateTime(), 'UTC')
spacetime(zoned.toPlainDate(), 'UTC')
s.set(zoned)
// @ts-expect-error Invalid dates return null.
const certain: Temporal.ZonedDateTime = s.toTemporal()
// @ts-expect-error Durations are not date inputs.
spacetime(Temporal.Duration.from('P1D'))
void [result, certain]
