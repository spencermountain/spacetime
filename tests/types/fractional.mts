import spacetime, { type Spacetime, type TimeUnit } from 'spacetime'

const s = spacetime('2024-01-31', 'UTC')
const units: TimeUnit[] = ['day', 'months', 'year', 'millennium', 'millenniums']
units.forEach((unit) => {
  const added: Spacetime = s.add(0.5, unit)
  const subtracted: Spacetime = s.subtract(1.5, unit)
  added.iso()
  subtracted.iso()
})

// @ts-expect-error Arithmetic amounts must be numbers.
s.add('0.5', 'day')
// @ts-expect-error Unknown units are rejected.
s.add(0.5, 'unknown-unit')
