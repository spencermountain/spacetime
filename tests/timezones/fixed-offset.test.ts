import test from 'tape'
import spacetime from '../_lib/index.ts'

// A fixed-offset timezone is named by its offset, like '+05:14'.
// Whole hours keep their iana name, like 'Etc/GMT-5'.
const offsetName = (mins: number): string => {
  const abs = Math.abs(mins)
  return (mins < 0 ? '-' : '+') + String(Math.trunc(abs / 60)).padStart(2, '0') + ':' + String(abs % 60).padStart(2, '0')
}

test('any whole-minute offset is a timezone', (t) => {
  const s = spacetime('2024-03-04T16:20:00+05:14')
  t.equal(s.timezone().name, '+05:14', 'name')
  t.equal(s.time(), '4:20pm', 'keeps the clock')
  t.equal(s.epoch, Date.parse('2024-03-04T16:20:00+05:14'), 'keeps the moment')
  t.equal(s.offset(), 314, 'offset')
  t.equal(s.hasDST(), false, 'no dst')
  t.equal(s.iso(), '2024-03-04T16:20:00.000+05:14', 'iso')
  t.equal(s.format('iso-full'), '2024-03-04T16:20:00+05:14[+05:14]', 'iso-full')
  t.equal(s.add(6, 'months').iso(), '2024-09-04T16:20:00.000+05:14', 'stays fixed')
  // neighbours behave the same way
  t.equal(spacetime('2024-03-04T16:20:00+05:15').timezone().name, '+05:15', 'quarter hour')
  t.equal(spacetime('2024-03-04T16:20:00+05:30').timezone().name, '+05:30', 'half hour')
  t.equal(spacetime('2024-03-04T16:20:00-15:00').timezone().name, '-15:00', 'beyond 14 hours')
  t.end()
})

test('whole-hour offsets keep their iana name', (t) => {
  t.equal(spacetime('2024-03-04T16:20:00+05:00').timezone().name, 'Etc/GMT-5', '+05:00')
  t.equal(spacetime('2024-03-04T16:20:00-08:00').timezone().name, 'Etc/GMT+8', '-08:00')
  t.equal(spacetime('2024-03-04T16:20:00+14:00').timezone().name, 'Etc/GMT-14', '+14:00')
  t.equal(spacetime('2024-03-04T16:20:00-12:00').timezone().name, 'Etc/GMT+12', '-12:00')
  // iana stops at 'Etc/GMT+12'
  t.equal(spacetime('2024-03-04T16:20:00-13:00').timezone().name, '-13:00', '-13:00')
  t.equal(spacetime('2024-03-04T16:20:00+00:00').timezone().name, 'Etc/GMT', '+00:00')
  t.end()
})

test('an offset as the timezone', (t) => {
  const want = Date.parse('2024-03-04T16:20:00+05:14')
  t.equal(spacetime('2024-03-04T16:20:00', '+05:14').epoch, want, 'argument')
  t.equal(spacetime('2024-03-04T16:20:00[+05:14]').epoch, want, 'bracket')
  t.equal(spacetime(want, 'UTC').goto('+05:14').time(), '4:20pm', 'goto')
  t.equal(spacetime('2024-03-04T16:20:00', 'utc+5:14').tz, '+05:14', 'utc+5:14')
  t.equal(spacetime('2024-03-04T16:20:00', '-4.5hrs').tz, '-04:30', '-4.5hrs')
  // an offset with a named timezone only sets the moment
  const la = spacetime('2024-03-04T16:20:00+05:14', 'America/Los_Angeles')
  t.equal(la.epoch, want, 'same moment')
  t.equal(la.timezone().name, 'America/Los_Angeles', 'named timezone')
  t.end()
})

test('older fractional names still work', (t) => {
  const arr = [
    ['Etc/GMT-5.5', '+05:30'],
    ['etc/gmt+3.25', '-03:15'],
    ['utc/gmt-5.75', '+05:45'],
    ['Etc/GMT-12.75', '+12:45']
  ]
  arr.forEach(([old, name]) => {
    const s = spacetime('2024-03-04T16:20:00', old)
    t.equal(s.timezone().name, name, old)
    t.equal(s.iso(), '2024-03-04T16:20:00.000' + name, old + ' iso')
  })
  t.end()
})

test('every whole-minute offset keeps its moment and its clock', (t) => {
  const bad: string[] = []
  for (let mins = -1439; mins <= 1439; mins += 1) {
    const off = offsetName(mins)
    const iso = '2024-03-04T16:20:30.123' + off
    const epoch = Date.parse(iso)
    const s = spacetime(iso)
    const ok = s.epoch === epoch &&
      s.iso() === (mins === 0 ? iso.replace(off, 'Z') : iso) &&
      s.offset() === mins &&
      s.hour() === 16 && s.minute() === 20 && s.millisecond() === 123 &&
      s.hour(3).epoch === epoch - (13 * 3600000) &&
      s.add(1, 'day').epoch === epoch + 86400000 &&
      s.startOf('day').epoch === epoch - ((16 * 3600000) + (20 * 60000) + 30123) &&
      s.goto('Asia/Kathmandu').goto(s.tz).epoch === epoch &&
      spacetime(s.format('iso-full')).epoch === epoch &&
      spacetime('2024-03-04T16:20:30.123', off).epoch === epoch
    if (!ok) {
      bad.push(off)
    }
  }
  t.deepEqual(bad, [], 'all 2879 offsets')
  t.end()
})
