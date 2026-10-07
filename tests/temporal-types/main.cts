import spacetime = require('spacetime')
const input = Temporal.Instant.fromEpochMilliseconds(0)
const result: Temporal.ZonedDateTime | null = spacetime(input, 'UTC').toTemporal()
void result
