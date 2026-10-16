import spacetime = require('spacetime')

const s = spacetime('2024-02-29', 'UTC')
const added: ReturnType<typeof spacetime> = s.add(0.001, 'millennium')
const subtracted: ReturnType<typeof spacetime> = s.subtract(0.5, 'millenniums')
added.iso()
subtracted.iso()

// @ts-expect-error Arithmetic amounts must be numbers.
s.subtract('0.5', 'year')
// @ts-expect-error Unknown units are rejected.
s.subtract(0.5, 'unknown-unit')
