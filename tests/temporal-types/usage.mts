import spacetime, { type Spacetime } from 'spacetime/temporal'

const s: Spacetime = spacetime('2024-02-29', 'UTC')
const native: Temporal.ZonedDateTime | null = s.toTemporal()
const formatted: string = s.format('{month} {date}')
const json = s.format('json')
if (json !== '') {
  const year: number = json.year
  void year
}
const epoch: number | null = s.epoch
const equal: boolean | null = s.isSame('day', s.clone())
const months: number = s.diff(s.add(1, 'year'), 'months')
spacetime(Temporal.Now.instant(), '+05:30').hour(9, true)
spacetime(Temporal.PlainDate.from('2024-02-29'), 'UTC')
spacetime([2024, 'February', '29th'], 'UTC')
spacetime({ year: 2024, month: 'february', date: 29 }, 'UTC')
spacetime.today('UTC').weekStart('sat').startOf('week')
s.tz = 5.5
s.epoch = null
s.json({ hour: 12 }).ampm('pm')
// @ts-expect-error The Temporal entry has no relative-time prose API.
s.since('2024-01-01')
// @ts-expect-error No legacy timezone table is exposed.
s.timezones
// @ts-expect-error The Temporal entry does not expose timezone discovery.
spacetime.whereIts('3pm')
// @ts-expect-error A native result can be null for invalid dates.
const certain: Temporal.ZonedDateTime = spacetime('bad input').toTemporal()
// @ts-expect-error Native Temporal types are retained, not any.
native?.nonexistent()
void [native, formatted, epoch, equal, months, certain]
