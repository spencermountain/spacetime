/// <reference lib="esnext.temporal" />
import spacetime, { type TemporalInput, type TemporalResult } from 'spacetime'

const inputs: TemporalInput[] = [
  Temporal.Instant.fromEpochMilliseconds(0),
  Temporal.ZonedDateTime.from('2026-07-15T12:00+09:00[Asia/Tokyo]'),
  Temporal.PlainDate.from('2026-07-15'),
  Temporal.PlainDateTime.from('2026-07-15T12:00')
]
inputs.forEach(input => {
  const result: TemporalResult | null = spacetime(input).toTemporal()
  if (result) {
    const native: Temporal.ZonedDateTime = result.add({ days: 1 })
    spacetime(native)
  }
})

// @ts-expect-error Conversion can return null for an invalid date.
const definite: Temporal.ZonedDateTime = spacetime('not a date').toTemporal()
// @ts-expect-error A duration is not a supported date input.
const duration: TemporalInput = Temporal.Duration.from('P1D')
void definite
void duration
